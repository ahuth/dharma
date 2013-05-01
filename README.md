Dharma
======

>that which maintains the stability and harmony of the universe.  
>-[Wikipedia.org](http://en.wikipedia.org/wiki/Dharma)

__Dharma__ is a single page webapp/dashboard for a manufacturing environment.  Its purpose is to bring together key information about the previous day to one place.

I built this to learn about single page web applications, web design, and javascript patterns.

## Concepts

* Javascript module pattern
* Pub/sub keeps modules completely seperate
* Modifying the browser history so we can use the back/forwards buttons
* Caching server data
* Cheating... once we display a "page", we start downloading any data we're likely to need next
* Client-side [Mustache templates](http://mustache.github.io/) to generate our webapp "pages"

## Installation

__Dharma__ is a simple web application, so all you need to do to run it is serve it up with your favorite server that supports PHP 5.4+.  I use [Wampserver](http://www.wampserver.com/en/) and [MAMP](http://www.mamp.info/en/index.html).

## Credits
This project is made possible with the help of
* [Chart.js](http://www.chartjs.org/) for *__very__* quickly and easily drawing `<canvas>` charts
* [accounting.js](http://josscrowcroft.github.io/accounting.js/) to bring some sanity to number formatting with javascript
* [Hogan.js](http://twitter.github.io/hogan.js/) for client-side [mustache](http://mustache.github.io/) templating
* [RSVP.js](https://github.com/tildeio/rsvp.js?utm_source=javascriptweekly) for __powerful__ asynchronous code organization

## License

The MIT License (MIT)

Copyright (c) 2013 Andrew Huth

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
