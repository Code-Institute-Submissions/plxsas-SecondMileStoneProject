# Salha Saad Gender Gap in Europe: Interactive Frontend Development Milestone Project - Code Institute

## 1. UX design

## 1.1 Project Purpose

This is an interactive frontend development milestone project in which I have highlighted the gender gap difference across several European countires in terms of the labor market representation of both women and men, the pay gap and the difference in both participation in caring responsibilites and social activities. I have used d3.js library to build number of functions to draw multiple charts where these differences could be seen. The data for this project have been downloaded from the eurostat statistic explained website and have been averaged across 2005, 2010, 2012 and 2015.


## 1.2 Information Architecture

The features, design and coloring scheme across the four pages were kept consistent and uniformed for the purpose of ease of use and navigation. The navigation bar was designed to be to the side of the webpage with toggle button for a full and minimazed view. On the home page there is a short introduction to the study's data and its source. Then the viewer will have the choice of scrolling through the list under the statistic section in order to view the power representation, salary and social responsibilites gaps. Under each of these section there will be a summary on the results as well as a chart demonstrating these differences. Sometimes they will be a button to display men and women results separately. Some of the plots are also dynamic, responsive to show different parts of the data whenever the mouse is hovered over. I have also made sure that the color scheme of different cateogories in all charts and typography were recycled across this project.  


## 2. Features

### 2.1 Existing Features

This project as said above is aiming to highlights the gender gap across the European countries. I have designed the home page to provide the user with an overall goal and what is he or she is going to browse in the next few pages. For this reason I have used html cards to list the total number of men and women who has participated in this study as well as another card to contain a quote from the European commision webpage where the emaphasis on gender gap is mentioned briefly. The header and the sidebar are kept the same across the four pages of this project. I have used a toggle button to colapse and expand the side bar. There is also two button on the sidebar that are clickable. One button is to download the source code from the github and the other will take the user to a report from the European commission for a further reading. There is a dropdown button on the side bar to navigate between the other three page of this project. On the header, there is search bar to use if the user is particulary looking for certain keywords. The alarm symbol to the right side of the header is to list the number of user who logged in recently, registered and sent a message. 

After clicking on the repsentation gap from the statistics dropdown, the user will be taking to the power share differences between men and women. The features layout and design are the same. It start with a card briefly summarizing the overall gender difference from the below charts. There two button to toggle between men and women data presentation. The pie chart of each EU country is to show the proportion of either men or women who is under each one of the cateogires descirbed in the legnd from the total number. I have also added pie chart at the end to average the results across all considered countires. 

Moving on to the next page which is salary gap page, the user should see the same layout with card descriping the results and JS charts rendered utilizing d3.JS functions. The function to draw these pie charts is in the js file and takes two paramters (the csv file and the div element IDs). This function is called from within the HTML file after passing on the two mentioned above and required parameters. I have used the onload funtion the body tag to automatically render women data whenever this page is loaded. Then the user have the opportunite to display men data instead or go back to women data for a comparison. 

On the third page, I have implemented the same features layout. The d3.js function that drawn both bar and pie charts is in the external js file, however the data is supplied internally in the html file before calling the function that will be also asking for div element IDs in which the graph will be rendered. Both the barchart and pie chart are responsive which means whenver the user is hovering on any of the bars in the barchart or on any of the segments in the pie chart the data will be displayed accordingly. For an example, the user may wish to only have a look at 2005 data only by putting the curser on the pie chart sement that says 2005. On the contarry, the use may would like instead to view the data from the three years 2005, 2010 and 2015 for each EU country. In the legend, there will details on the total number of participants as well percentages for each year of the study. 

The last element of gender gap is on the caring repsonsibilties and social activities. In addition the card that summarize the results, there are two stacked bar chart, one for women and one for men. In the js file, there are two functions, one called, women_social and the other men_social that are called immediatly in the html file after initiation the div element. Each graph will be rendered with a title and legend explaining the different segments of the stacked barchart. 




### Features Left to Implement


## Code Quality:
As this is an interactive Frontend Development Milestone Project, javascript especially d3.js libaray have been haveily used to draw and visiulaze the data. The code has been inclosed within the function whenever possible that was later called from within html element. Wherever possible these function were generlized through passing parameters names. I have also used a lot jQuary to target specific html elements. Some of chart's drawing code been borrowed but I have made a major a changes on them. Some functions contain specific code to allow for dynamic and responsive desgin and selective data visulization. In the css file,some of the styling was either newly created or overwriting to achieve the desired look of the features.  


## Version control:

I have asked few people for a feedback on my website in terms of its relevancy and clarity. The feedback was good and the website achieved the intended outcome of providing a summary on the gender gap in Europe. One of the feedback was that my website layout and features are presented in the most concise and meaningful way. They can view both the live version and the GitHub repository by clicking on the Font Awesome icons. They are also able to download source code by clicking on the download button on the nav bar of each page. All clickable button have been checked to insure that the correct data type are being displayed. All links will open in a new tab using 'target="_blank"'. All links have been manually tested to ensure that they are pointing to the correct destination. This site was tested across multiple browsers (Chrome, Safari, Internet Explorer, FireFox). I have validated both html files and css file on Markup Validation Service and made the suggested adjustment accordingly. This site is hosted using GitHub pages, deployed directly from the master branch. The deployed site will update automatically upon new commits to the master branch. In order for the site to deploy correctly on GitHub pages, the landing page must be named index.html. To run locally, you can clone this repository directly into the editor of your choice by pasting git clone https://plxsas.github.io/SecondMileStoneProject/ into your terminal. Finally readme file is written to explain what are the main features of this project and how they have been deployed. 


I have used some of the code from these website but I have made some changes on them. 

http://bl.ocks.org/NPashaP/96447623ef4d342ee09b
https://bl.ocks.org/mbostock/3888852
https://bl.ocks.org/mbostock/1134768





# Your Project's Name

One or two paragraphs providing an overview of your project.

Essentially, this part is your sales pitch.
 
## UX
 
Use this section to provide insight into your UX process, focusing on who this website is for, what it is that they want to achieve and how your project is the best way to help them achieve these things.

In particular, as part of this section we recommend that you provide a list of User Stories, with the following general structure:
- As a user type, I want to perform an action, so that I can achieve a goal.

This section is also where you would share links to any wireframes, mockups, diagrams etc. that you created as part of the design process. These files should themselves either be included as a pdf file in the project itself (in an separate directory), or just hosted elsewhere online and can be in any format that is viewable inside the browser.

## Features

In this section, you should go over the different parts of your project, and describe each in a sentence or so.
 
### Existing Features
- Feature 1 - allows users X to achieve Y, by having them fill out Z
- ...

For some/all of your features, you may choose to reference the specific project files that implement them, although this is entirely optional.

In addition, you may also use this section to discuss plans for additional features to be implemented in the future:

### Features Left to Implement
- Another feature idea

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.


## Testing

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Contact form:
    1. Go to the "Contact Us" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.


## Credits

### Content
- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media
- The photos used in this site were obtained from ...

### Acknowledgements

- I received inspiration for this project from X
