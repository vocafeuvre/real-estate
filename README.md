## Real Estate Listing App
Real Estate Listing App in JAMStack using Gatsby, Graphql through an Apollo Server and Firebase. You can access the live app here: https://real-estate-vocafeuvre.netlify.com/

Note: the Firebase cloud function running the Apollo server is hosted in us-central, so the contents might be a bit slow in loading.

### Backend
We used Firebase Cloud Firestore and Cloud Functions for most of the backend functionality. We retrieve the listings from a GraphQL server hosted in a Cloud Function. The pictures used in listings are stored in Firebase also. Authentication is through Firebase Auth.

### Credits
Thanks to Parminder Sanghera and his gatsby-starter-ecommerce starter! We kickstarted this project using it.
