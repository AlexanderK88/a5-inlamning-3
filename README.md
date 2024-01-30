
Dokumentation: CMS API
Dokumentation av CMS:ets API finns här (swagger): https://plankton-app-xhkom.ondigitalocean.app/documentation/v1.0.0 

Movies
Samma resurser som i föregående uppgift, och inget nytt i denna uppgift.

https://plankton-app-xhkom.ondigitalocean.app/api/movies 

https://plankton-app-xhkom.ondigitalocean.app/api/movies/1 (etc)


Reviews
Två relevanta resurser rör recensioner och betygsättning.

https://plankton-app-xhkom.ondigitalocean.app/api/reviews
GET för att hämta alla recensioner, med följande relevanta querystring-parametrar:
filters[movie]=X för att hämta recensioner för film med id X
pagination[page]=X för sida X
pagination[pageSize]=X för X recensioner per sida

POST för att lägga till recension
https://plankton-app-xhkom.ondigitalocean.app/api/reviews/1 (etc)


Screenings
En resurs är relevant för filmvisningar.

https://plankton-app-xhkom.ondigitalocean.app/api/screenings
GET för att hämta alla visningar, med följande relevanta querystring-parametrar:
populate=movie för att inkludera filmdata i varje screening
filters[movie]=X för att hämta visningar av film med id X