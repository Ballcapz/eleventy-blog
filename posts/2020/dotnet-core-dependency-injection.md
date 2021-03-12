---
layout: post-layout.njk
title: Dotnet Core Console Appliction Dependency Injection
date: 2020-09-03
tags: ["post"]
---

## App.cs

1. Add App.cs file to the project
2. Add a Run method to the `App.cs` file, as shown below

```cs
// This is now equivalent to Main in Program.cs
public void Run()
{
    Console.WriteLine("Hello from App.cs");
}
```

<!-- Excerpt Start -->

The `App.cs` class that will be used to run the application.
`Program.cs` will be used to do the setup and register the IOC container, and the `App.cs` will contain all of the running console application code.

<!-- Excerpt End -->

## appsettings.json

Add a json configuration file to the project and name it `appsettings.json`

![alt text](https://i.postimg.cc/1znMBd0H/add-appsettings.png "Add appsettings.json in VS 2019")

2. Install Nuget Package `Microsoft.Extensions.DependencyInjection`
3. Install Nuget Package `Microsoft.Extensions.Configuration`
4. Install Nuget Package `Microsoft.Extensions.Configuration.Binder`
5. Install Nuget Package `Microsoft.Extensions.Configuration.Json`
6. **IMPORTANT:** Open appsettings.json properties, and change `Copy To Output Directory`, to `Copy if newer` or `Copy always`

![alt text](https://i.postimg.cc/MprdywBH/important-appsettings-properties-copy-to-output.png "Change appsettings.json file properties to copy to output directory")

- Add the following to `Program.cs`

```cs
static void Main(string[] args)
{
    var services = ConfigureServices();

    var serviceProvider = services.BuildServiceProvider();

    // calls the Run method in App, which is replacing Main
    serviceProvider.GetService<App>().Run();
}
private static IServiceCollection ConfigureServices()
{
    IServiceCollection services = new ServiceCollection();

    var config = LoadConfiguration();
    services.AddSingleton(config);

    // required to run the application
    services.AddTransient<App>();

    return services;
}
public static IConfiguration LoadConfiguration()
{
    var builder = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

    return builder.Build();
}
```

This registers the `appsettings.json` with the .net core Dependency Injection container, and allows us to use the configuration file for things like connection strings and logging directories.

## Using Configuration In The App

- Dependency Inject the registered configuration

```cs
// in App.cs
private readonly IConfiguration _config;
```

```cs
public App(IConfiguration config)
{
    _config = config;
}
```

- Add a configuration section and value to `appsettings.json`:

```json
{
  "Runtime": {
    "LogOutputDirectory": "C:\\temp\\programLog.txt"
  }
}
```

- Use this configuration in `App.cs`

```cs
public void Run()
{
    var logDirectory = _config.GetValue<string>("Runtime:LogOutputDirectory");
    // Using serilog here, can be anything
    var log = new LoggerConfiguration()
        .WriteTo.Console()
        .WriteTo.File(logDirectory)
        .CreateLogger();

    log.Information("Serilog logger information");
    Console.WriteLine("Hello from App.cs");
}
```

## Register Interfaces with Concrete Objects

1. Add the files `IUser.cs` and `User.cs` to the project
2. In the `Program.cs` method `ConfigureServices()` add:

```cs
services.AddTransient<IUser, User>();
```

Which makes the `ConfigureServices()` look like:

```cs
private static IServiceCollection ConfigureServices()
{
    IServiceCollection services = new ServiceCollection();

    var config = LoadConfiguration();
    services.AddSingleton(config);

    services.AddTransient<IUser, User>();

    services.AddTransient<App>();

    return services;
}
```

This allows us to write our code against our interface. In order to do so, we need to "inject" the interface into our `App.cs`

```cs
private readonly IConfiguration _config;
private readonly IUser _user;

public App(IConfiguration config, IUser user)
{
    _config = config;
    _user = user;
}

...
// using the IUser
_user.TruncateName("Jerry     ");
...
```

## Conclusion

Setting up dependency injection and configuration in this manner allows us to use configuration easily throughout our Console applicaiton, as well as giving us the ability to program against interface. This helps keep our code losely coupled and testable, along with giving us the ability to extend our application easily beyond the scope of a Console application.

Code Example On Github:
https://github.com/Ballcapz/Console-Application-Dependency-Injection
