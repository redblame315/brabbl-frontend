How to create different themes per customer
-------------------------------------------

* The base theme should use SASS variables for everything that is configurable per customer
* For customer a theme stylesheet is created which imports the base styles and overrides the relevant variables (e.g.: `src/css/themes/vorwaerts.scss`)
* When running `npm run build_staging|production` webpack's production config creates a separate and distinct css file per customer (e.g.: `/dist/build/staging/compiled-themes/vorwaerts.css`)
* These themes should also be copied to the backend server as part of the deployment process
* Now the snippet needs to be modified so that the appropriate stylesheet (the base stylesheet in case the customer doesn't use any extra styles) is also injected on the customer's site.
* Themes are set in Customer's settings in Django admin panel

Further exploration:
--------------------

* Instead of pointing each customer to a different file it might make sense to use a more generic solution:
Hence the snippet could not include the file directly but ask a Django view (the backend) for the stylesheet to inject. (Check: Perfomance/Caching)
