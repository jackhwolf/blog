# Basic Flask #3: Introducing `flask-restplus` and extending our API
Hi! So far, we've made a pretty simple API using a basic `app` object from `flask`. Today
I would like to introduce you to an awesome `flask` extension that I use almost every
time I use `flask`. Its called `flask-restplus` and is designed to aid the development
of RESTful APIs with `Flask`. 

Check out the  <a href="https://github.com/jackhwolf/blog-backend/tree/master/admin/tutorials/T1-BasicFlask/post3
" target="_blank">repo here!</a>

# Our simple API
----
 > <img style="align: center; width: 400" src="https://github.com/jackhwolf/blog/raw/master/src/posts/f3dcbbba256e497ea44dc783e4fac310===1577665042/app-2.png">

Check out the simple API we've made in parts 1 and 2. In this post, I would like to extend
on it a bunch. That means adding some endpoints, and adding a lot more logic for each `HTTP`
method on each endpoint. In classic `flask`, this could get a little convoluted and you might
write a lot more code than you need to, or have huge methods with lots of `if request.method ==`. 
Instead, lets check out `flask-restplus`. 

# `flask-restplus` setup
----
 * ### Read the Docs
<a href="https://flask-restplus.readthedocs.io/en/stable/" target="_blank">`flask-restplus` docs!</a>
 * ### Installation
To get started with `flask-restplus`, `cd` into this project directory, activate your development
environment, and run `pip install flask_restplus`

 * ### Import and Initialization
There are 3 modules you will need from `flask-restplus`: `Resource` `Api`, and `reqparse`. The `Api` module is
very similar to the `Flask` object, it is really just a constructor we use to get an object that we can
use to define routes. From there, we initialize our `app` like normal, and then pass that `app` in as the
first parameter to the `Api` constructor. This exposes our `flask-restplus Api` through our `flask App`. I'll talk about `reqparse` later.
 > <img style="align: center; width: 400" src="https://github.com/jackhwolf/blog/raw/master/src/posts/f3dcbbba256e497ea44dc783e4fac310===1577665042/change-1.png">
 
# `flask` --> `flask-restplus`: pretty simple
----
It is super easy to convert from `flask` to `flask-restplus`. The biggest difference is the abstraction
of routes into classes through the `Resource` module from `flask-restplus`. Check out the old `flask` syntax
compared to the new `flask-restplus` syntax below.
 > <img style="align: center; width: 400" src="https://github.com/jackhwolf/blog/raw/master/src/posts/f3dcbbba256e497ea44dc783e4fac310===1577665042/change-2.png">
 
 * ### Routing using `api` instead of `app`
 It's important to notice that we call the `route` decorator on `api`, not `app`.  
 
 * ### Route to a class, not a method
 Instead of tying the route to a function, we define a class which extends the `Resource` module from
 `flask-restplus`. From there, each `HTTP` method gets its own class method. We can still use the `flask
 request` module to read the request data, but now we don't have to have the messy `if` statements within
 the logic to differentiate between `HTTP` methods. 
 
# Some extensions to our API and UserLocalStorage
---
I wanted to beef up our API a bit to be more robust. This includes request parsing and
adding a bit more logic to the `UserLocalStorage`. Let's check it out!
## `reqparse`: `flask-restplus` version of `argparse`
 The `reqparse` module is extremely useful and follows the same syntax as `Python`s
 `argparse.ArgumentParser`. Given a set of arguments, it will search the entire request body for the 
 args and return a (key, value) mapping. This is super useful and allows you to easily expand your `api`
 and add optional arguments. Check out the  <a href="https://flask-restplus.readthedocs.io/en/stable/parsing.html" target="_blank">docs!</a>. 
 > <img style="align: center; width: 400" src="https://github.com/jackhwolf/blog/raw/master/src/posts/f3dcbbba256e497ea44dc783e4fac310===1577665042/part3-reqparse.png">
 
 This is how you initialize your parser. Outside of the constructor, the main
 method to check out is `parser.add_argument(arg, **kw)`. This method will tell the
 `parser` to look for `arg` across the request body. To access the args, we need to make 
 2 small changes. The first is telling our `Resource` instances to expect the `parser`. 
 Like lots of things in the `Flask` world we can do this easily with a decorator. 
 > <img style="align: center; width: 400" src="https://github.com/jackhwolf/blog/raw/master/src/posts/f3dcbbba256e497ea44dc783e4fac310===1577665042/part3-expect.png">
 
 And then, the return value of `parser.parse_args()` will be a dictionary of all of the
 args you request. Use this in any method you need. So check out the API now with the use
 of `reqparse`.
 > <img style="align: center; width: 400" src="https://github.com/jackhwolf/blog/raw/master/src/posts/f3dcbbba256e497ea44dc783e4fac310===1577665042/part3-api.png">
 
 As you can see, the logic in each method looks very similar. We parse the arguments from the 
 request, take out the `uname`, and pass thr `uname` and request data to the proper `UserLocalStorage`
 method. From there, we let `UserLocalStorage` handle the logic depending on the request data.
 
## A beefed up `UserLocalStorage`
 The use of `flask-restplus` and `reqparse` allows us to take a lot of logic out of the API route itself, but does
 introduce some more stuff for us to handle in the `UserLocalStorage`. But this is also a blessing. We can easily 
 include optional data with any request to update, delete, or get certain attributes for a user. Now, each
 `UserLocalStorage` method takes a `uname` and a dictionary of the parsed arguments from the request body. Not all
 arguments are guaranteed to be non-null, and we have to check this to know what to return, change, or delete. But
 basically, all this means is checking if there are args, and then if there are, looping over them. Check it out
 > <img style="align: center; width: 400" src="https://github.com/jackhwolf/blog/raw/master/src/posts/f3dcbbba256e497ea44dc783e4fac310===1577665042/part3-ULS.png">
 
 In `get`, for example, if a request with `attrs` comes in, we 
 loop over the requested `attrs` and generate a dict of the
 users values for each attr, and include this dict in the response.
 
# Testing the API
Lets submit a new user with some data, and then try to `GET` only one of their attributes back.

```
>>> import requests
>>> url = "http://127.0.0.1:8000/user"
>>> requests.post(url, data={'uname': 'skippy', 'email': 'skippy@wolf.com', 'location': 'San Francisco, CA'})
<Response [200]>
>>> 
>>> requests.get(url, data={'uname': 'skippy'}).json()
{'response': 
    "{'userInfo': {'name': 'skippy', 'signupTime': '1577657313'}, 
      'userData': {'email': 'skippy@wolf.com', 'location': 'San Francisco, CA', 'favoriteFood': None}}"
}
>>> 
>>> requests.get(url, data={'uname': 'skippy', 'attrs': 'location'}).json()
{'response': 
    "{'userInfo': {'name': 'skippy', 'signupTime': '1577657313'},
      'userData': {'location': 'San Francisco, CA'}}"
}
```

I really like `flask_restplus` and will probaly use it for every `flask` post I do. I think it makes building
robust APIs very simple and is super powerful! I hope this tutorial showed you a bit of what it can do. Thanks!

Jack
