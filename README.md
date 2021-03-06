# Group-5-QuickBites
Names: Brandon Leger, Daniel Gomez, Craig Moir, Nan Chen, Patrick McCleerey

# Accessing the Site:
Accessing the Vendor login page:
<https://afternoon-reef-41036.herokuapp.com/vendorLogin>

The user login page may be accessed via the "Looking to Shop?" button, and the vendor login page may subsequently be accessed by the "Looking to Sell?" button.

Accessing the Admin Home Page:
<https://afternoon-reef-41036.herokuapp.com/adminHome>

# Credentials:
Login for User Account(s):

Email: john@gmail.com
Password: p

Email: jane@gmail.com
Password: p

Login for Vendor Account(s):

Email: burger@burger.com
Password: p

Email: crusty@crab.com
Password: p

Email: shrek@swamp.com
Password: p

Further accounts can be created using the registration fields on the respective login page. Account information (with the exception of email address) can be changed in the account details page on the site.

# Known Issues:

* Do not have multiple tabs of the site open (ex: the user home page and a restaurant menu)
* Concurrent user/vendor access causes synchronization issues. Doing so will cause issues that will require our manual intervention.
* ALWAYS LOG IN, if attempting to access the website from a different context. The only exception to this is the admin page, which does not have a login page implemented. It is still important to close a vendor/user instance fully before attempting to access the admin page.
* We do not prevent users from ordering items from multiple stores.
* Availability checking occurs when adding the item to the cart, not at checkout.
* Input validation is improperly handled for menu items.
* Admin metrics can be accessed at /adminMetrics

# Contact Info:
If, for any reason, there is an interruption in the hosting service, we should be able to manually restart the web server. 
We can be reached at our respective email addresses (it's probably best to address the email to all of us, so that we are more likely to respond quickly):

Brandon: bpl5252@psu.edu
Craig: cdm5698@psu.edu
Daniel: dxg5480@psu.edu

