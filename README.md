# service-worker-by-example

Quick showcase for using service workers (on purpose without any framework support)

## Running the application in dev mode

The app was build using [Quarkus][quarkus] - so you can start it in dev mode (that enables live reload) using:
```
./mvnw quarkus:dev
```

Then open: http://localhost:8080 to visit the UI

* First Use-Case is _Calculating Prime-Numbers_:
    * **inside a web-worker** => the seconds counter (and thus the actual app) is still working and reporting
    * **in main-thread** => the seconds counter is blocked now, since the main thread is busy calculating prime numbers
* Seconds Use-Case is _Fetching Data from Backend_:
    * simulating a sluggish calculation at the backend the counter is again working and counting the time it takes to get the backend-stuff.
    
When considering [WebWorker][webworker] you should have a look at [Comlink][comlink] (which claims: _Comlink makes WebWorkers enjoyable._) 

[webworker]:https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
[comlink]:https://github.com/GoogleChromeLabs/comlink
[quarkus]:https://quarkus.io/