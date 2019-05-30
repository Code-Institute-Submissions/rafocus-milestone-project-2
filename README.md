# Milestone project 2
## visualization dashboard of the 50 best movies of all time

This one-page website is designed to present the 50 best movies according to IMDB in a visual way, allowing us to analyse and add filters, have contextual information, hopefuly help us to have some insight.

The website can be viewed here:
https://rafocus.github.io/milestone-project-2/

## UX

The website site interface allows the user to apply filters to vizualize different aspects of the data.

* Colour scheme: a minimalist colour scheme is used to enhance the contrast and avoid distraction and let the colorful charts standout.
* Design: doing the best to compromise between the user experience and the quality of data presented, some design choices were decided:
 - The design is fully responsive with break points in the medium size screen range.
 - The bubble chart was kept as it is a rich source of information despite the challenge to fit it on the screen and making it responsive, the longer axis was made vertical minimizing scrolling.

* User stories:

- A user can see many dimensions at the same time, the evolution of gross profits through the years, see the total nominations for the Oscars for different film genres.
- A user can use most of the charts to filter the data to one or more dimensions or aspects of the dataset.
- The user can cancel all filters by clicking on the "reset all" button.
- A user looking for aditional information for a particular record of the dataset can use a mouse hover over that record.

* Wireframes: 

<img src="static/wireframes/desktop.png" alt="desktop" height="400"/> <img src="static/wireframes/mobile.png" alt="mobile" height="400"/>

## Features

### Existing Features

* Vizualization of the dataset with different types of graphics including pie charts, bar charts, data table, and a bubble chart.
* Applying filters by clicking on the graphics.
* Mouse hover to get more informations of particular records of the dataset.
* Navigation to different parts of the web page.
* Presentation section to explain the functionality.
* Reset button to cancel all the filters applied.

## Technologies Used

* HTML5
* CSS
* JSON
* Bootstrap 4
* D3.js
* DC.js
* Crossfilter.js

## Development Tools:

* Local development, testing.
* Vscode editor.
* Git for versioning.
* Python http.server for testing.

## Testing

* Every chart was tested individually and part of the whole, adjusting the parameters to make it look at its best.
* Tested on different screen sizes, desktop, tablet, mobile.
* Responsiveness is limited to 2 screen sizes only, large, and small, due to the limitations of the charts.
* Tested with Chrome, Firefox, Microsoft Edge.
* The custom HTML/CSS code was validated using W3C tool.

## Deployment

- To deploy online, clone the project, deploy to a web server (github pages is adequate for this purpose), the file structure should be respected.
- For local development, clone the project, test and deploy with a lightweight development server like Python or Node http server.

## Credits

### Design

Rafocus

### Content

The data JSON file was created usoing the list published on IMDB (https://www.imdb.com/list/ls055592025/).