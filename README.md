DocumentDB Passport Boilerplate for Azure
=========================================

Note:  This project is under development.  However, the basic features are functional.  

This is a starter template for Microsoft Azure Websites that uses the new DocumentDB NoSQL datastore.

Node.js packages:

* express 
* passport
* documentdb
* express-session-documentdb

Azure Services:

* Website
* DocumentDB

Client Technologies:

* bootstrap 3.x
* html5

Requirements:

* Microsoft Azure Account
* DocumentDB Instance

Suggested:

* OAuth Credentials for Google, Facebook, Twitter, Github, LinkedIn, etc. 
* SSL Certificate for securing local login or use the default provided by Azure.


## Setup:

Using the [Azure Preview Portal](http://portal.azure.com)

* Create a DocumentDB Account
* Once provisioned, click the keys button and make a note of the URI and authorization key.

Using the [Azure Management Portal](https://manage.windowsazure.com/)

* Create new Azure Website.  
* Select Set up deployment from source control
* Select "External Repository"
* Clone this repository: https://github.com/lukevanhorn/documentdb-passport-boilerplate.git

On first run, you will be prompted to enter your DocumentDB credentials from the preview portal.  This is also where you enter the OAuth ID and Secret for each provider.

The baseUrl must match the domain you entered when registering with OAuth providers.  Unless you've setup a custom domain, this should be the site url listed on the dashboard. 

For Example: mywebsite.azurewebsites.net

Enter the credential for each OAuth provider.  Leave those blank that you do not wish to use.  You'll want to remove the icon/buttons fromt the login html code later on. 

Click the save button and your custom settings will be saved to "settings.json" in the root directory of the website.

The page will wait for 10 seconds and then refresh.  If the configuration page loads again, you may need to manually restart the site.  Also check to make sure the settings.json file now exists in the website root.

## Admin Account

Click register and enter "admin" as the user name and select a password at this time.  The first account registered under the username "admin" will be the site admin (you want to be the first!).  

** more to come soon.
