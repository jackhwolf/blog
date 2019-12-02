# Basic Flask #1: simple server

Hello! This is part 1 of my first tutorial series on the site and I am 
super excited to start! This post will cover some basic `Flask` stuff
(which is still *super* powerful and useful), with the future goal of setting up a basic
server that can handle `GET`/`POST` requests to store user information (or any data)
locally. This specific post will get a basic server up and running. 

<a href="https://github.com/jackhwolf/blog-backend/tree/master/admin/tutorials/T1-BasicFlask/post1" target="_blank">Here</a> 
is the link to the repo for this code. Let's get started...

# Setting up our Flask app
The first thing you'll need to do is make a project directory, or clone my repo above. Make sure
to run `pip install Flask` (or `pip install -r requirements.txt` if you've cloned) in the project directory. This 
article assumes all your code is in `app.py` and you're working in the same directory. 

The first few lines below create our flask object. We first need to import the `Flask` module from the `flask` library, 
and create our `Flask` object. The constructor can take a lot of parameters which can be very useful, but for now the only 
one we need to pass in is `import_name`, which tells `flask` where to look for modules we might import. In a 
one-file/one-folder app, you're safe to pass in the special Python variable `__name__`, which evaluates to `__main__` when 
the script is being run directly. We will use the builtin `time` module later on. 

```
from flask import Flask 
import time

# create app object
# __name__ tells the object to look for resources in this modules path
app = Flask(__name__)
```

# Our first route
Now we have our `app` and can begin defining routes. A "route" is basically the end of a URL after the domain/IP, 
which tells the application how to respond. For example, `geeksforgeeks.com/` would have the route `/`, and 
`geeksforgeeks.com/searching-algorithms` would have the route `/searching-algorithms`. That route tells 
the server to load data specific to searching algorithms, as opposed to all of the homepage data. 

With `flask`, you can assign routes to your `app` by using a special decorator on top of a function. 
This directs the application to execute the decorated function when the given route is pinged.

```
@app.route(<route>, methods=['GET'])
def foo():
    '''
    this will execute when someone sends 
    a request to <url>/<route>
    '''
    do some stuff
    return something
```

The parameter `route` specifies which route will trigger this function, and the optional `methods` 
parameter allows you to define the methods that are allowed to ping this route. It defaults to only `GET`.

I almost always start with a `/test` route that I can use to easily test the status
of my application and/or server through the browser or by request. This `/test` route will
return a success message along with the current time. To add this route to `app` and allow `GET`, we simply...

```
@app.route('/test')
def test():
    '''
    a simple route which by default only accepts GET requests
    we can use this to make sure our server is running
    '''
    return {'status': 'success': 'time': str(int(time.time()))}
```

So now, the app knows what to do when someone requests `<url>/test`. Any other route should throw a 
`404 Not Found` error.


*As a note*: It's kind of convention to name the function the same as the route, but that can 
become impossible when you have routes with the same base and different numbers of parameters.
More on that later.

# Running the app
To run `app`, add the line 

```
app.run(port=8000, debug=True)
```

to the bottom of the file. The `run` function from 
`flask` will expose the app to the world using magic. When we're doing this locally, the app will be hosted at 
`http://127.0.0.1:<port>`. The value for `port` defaults to `5000`, but can be changed by passing parameters
to `run` like we did. With this line at the end of the file, get into a terminal and `cd` into this project 
directory. From there, simply run 

```
$ python3 app.py
```

You should see some output from `flask` similar to the following

```
$ python3 app.py
 * Serving Flask app "app" (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: on
 * Running on http://127.0.0.1:8000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 174-946-441
```

And boom! If you navigate to `http://127.0.0.1:8000/test`, hopefully you see something along the
lines of 

```
{
  "status": "success", 
  "time": "1575250393"
}
```

Tune in later, when I'll walk through more complex routes, some different `HTTP` methods,
and introduce the `requests` library. Thank you for reading!

*Jack*

