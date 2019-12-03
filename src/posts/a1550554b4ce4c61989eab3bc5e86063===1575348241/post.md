# Basic Flask #2: more complex routes, other HTTP methods, & the `requests` library
Hi! This is part 2 of my first Flask tutorial series. The original goal was to set up 
a `Flask` server to handle `GET`/`POST` requests to store some user data locally, but turns out I cover that in this post. So I think I'll do one more post after this one on 
`Flask-Restplus`, an awesome `Flask` extension that I will be using from now on.

<a href="https://github.com/jackhwolf/blog-backend/tree/master/admin/tutorials/T1-BasicFlask/post2" target="_blank">Here</a> 
is the link to the repo for this code. Let's get started...


# Our local user data storage - a simple dictionary wrapper
----
 > <img style="align: center; width: 400" src="https://github.com/jackhwolf/blog/raw/master/src/posts/a1550554b4ce4c61989eab3bc5e86063===1575348241/user-local-store.png">
 
To represent a local data store, I just made a small class around a dictionary that returns what I want the API to return for each operation. You could easily use a dict and handle the return values from within the routing function, but I prefer something like this.


# Including data and using `flask.request`
----

 * ## Reminder: a basic route
 > <img style="align: center; width: 400" src="https://github.com/jackhwolf/blog/raw/master/src/posts/a1550554b4ce4c61989eab3bc5e86063===1575348241/no-params.png">

## A more complex endpoint
 * ### Passing data through url parameters
You'll need to add the line `from flask import Flask, request, make_response` at
the top of your `app.py`. The changes when 
 > <img style="align: center; width: 400" src="https://github.com/jackhwolf/blog/raw/master/src/posts/a1550554b4ce4c61989eab3bc5e86063===1575348241/url-params.png">
 
 You can pass variables to your API function through the url
 by using the `<type:name>` synatax. The `type` is optional and defaults
 to `str`. You also must include any variable `names` in the URL as
 parameters to your function. I always name them the same, in the order
 they appear in the URL. I'm honestly not sure if that's required or not. 
 That is, if my URL is `/user/<string:name>/<int:userid>/`, my function 
 header would be `def user(name, userid)`. From there, you can use those
 inputs just as you would with any other function arguments.
 
 * ### Allowing other HTTP methods
The second argument to `@app.route`, `methods=['GET', 'POST', 'DELETE']`
tells our `app` to only allow requests of those method types. Any other 
request, such as `PATCH` or `PUT` would get an error message from `flask`.

 * ### The `flask.request` module
We can use the `request` module from `flask` to inspect the incoming request
from a user. We can look at things like the method type, incoming data (which 
we get to soon), headers, and lots of other stuff. For now, we're only 
interested in the method type, in order to determine what to do with our input. <a href="https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data" target="_blank">Check out the docs</a> to learn more about this useful module. 

# An aside: Sending requests with `requests`
 ----
 The <a href=" https://2.python-requests.org//en/master/" target="_blank">`requests`</a> library is awesome. It makes it super easy to send requests of all different `HTTP` methods
 with custom headers and bodies. Sending requests follows the same pattern:
 
 To send an \<httpmethod\>, call `requests.<httpmethod>(url, headers={}, data={})`
 
 For example, to send a `GET` to `http://127.0.0.1:8000/test`, you could run from a 
 terminal
 
  > ```
 $ python3
  >>> import requests
  >>> resp = requests.get('http://127.0.0.1:8000/test')
   <Response [200]>
  >>> print(resp.json())
   {'status': 'success'}
 ```
 
 And a `POST` would look like...
 
 >```
  >>> resp = requests.post('http://127.0.0.1:8000/8000/user/jack')
   <Response [200]>
  >>> print(resp.json())
   {'response': 'True'}
 ```
 
# Passing JSON data
----
More often than not, you'll want to include JSON data in your API calls. For example,
we may want to store multiple attributes for each of our users, such as username, email, 
and password. On a `GET` call, we will need to retrieve and return this data to the user server-side, and on a `PUT` call we will need to include this data in the client-side 
request, and open it and store it server-side. The `flask.request` module makes it easy
to read in data, and Python's popular `requests` library makes it easy to send requests
with and without data.

* ### Client-side: `requests`
The `requests` library makes passing JSON data super easy. All you need to do is 
specify a `Content-Type: application/json` header, and pass in your JSON as a dict 
using the `json` keyword argument. For example, let's say we want to include user
attributes in our `POST` request. We can do that by

 >```
  >>> resp = requests.post('http://127.0.0.1:8000/8000/user/jack',       \
                           headers={'Content-Type': 'application/json'}, \
                           json={'username': 'SkippyElvis', 'email': 'a@b.c'})
   <Response [200]>
  >>> print(resp.json())
   {'response': 'True'}
 ```
 
* ### Server-side: `flask.request`
It's super easy to access the passed JSON data by using `request.get_json(force=True)`. This will
look for the JSON data in the request, and return it as a dictionary. The `force=True` parameter is 
not necessary if you send data in the correct format with the proper headers, but it doesn't hurt to 
keep. So, when the client sends a request like the one above, on the server-side you could call...
 
 >```
data = request.get_json(force=True)
print(data)
 >>> {'username': 'SkippyElvis', 'email': 'a@b.c'}
```

 
# Modifying our UserLocalStorage and API to handle JSON data
----
* ### UserLocalStorage `get` method should return a stringified dictionary of user data, and `add` method should accept a data parameter. It helps to stringify the dictionary to avoid 
 > <img style="align: center; width: 400" src="https://github.com/jackhwolf/blog/raw/master/src/posts/a1550554b4ce4c61989eab3bc5e86063===1575348241/userlocalstorage-2.png">
 
* ### Pass the JSON data from the request into the `UserLocalStorage.add` function
 > <img style="align: center; width: 400" src="https://github.com/jackhwolf/blog/raw/master/src/posts/a1550554b4ce4c61989eab3bc5e86063===1575348241/app-2.png">
 
With both of these done, our API can now send and receive JSON data!
 
 >```
  >>> resp = requests.post('http://127.0.0.1:8000/8000/user/jack',       \
                           headers={'Content-Type': 'application/json'}, \
                           json={'username': 'SkippyElvis', 'email': 'a@b.c'})
   <Response [200]>
  >>> print(resp.json())
   {'response': 'True'}
  >>> resp = requests.get('http://127.0.0.1:8000/8000/user/jack')
   <Response [200]>
  >>> js = resp.json()
  >>> print(js)
   {'response': "{'username': 'SkippyElvis', 'email': 'a@b.c'}"}
 ```

# Conclusion
----
So, in this post we learned how to set up our `flask` app to send and
receive JSON data. This is super helpful because JSON data is so flexible and easy to work with. In the next post, and final post of this 
introduction to `flask` series, I want to go over `flask_restplus`, and 
awesome extension that is much more suitable for larger and more complex
APIs. Fun!

Thanks for reading,

*Jack*