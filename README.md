# SUNY-Comparison-Web-App
Steps to Execute Program:

1.	Bring up the PROJECT-PART-2/Final-Source-Code directory into an IDE such as IntelliJ or PyCharm as a project. 
2.	The server.py has the code for the bottle webserver. Open that file in the IDE. 
3.	The IDE will install any libraries needed (bottle webserver library, etc.). Python 3.7 (or higher most likely) may have to be setup under Project Structure (Module Libraries). 
4.	Run server.py to start the webserver. 
5.	Open a web browser and point at localhost:8080. The Welcome Page will show up with options for ‘Locations’, Graduation Rates – 12 year progression’, and ‘Profile Details’. 
6.	Click each one to see a corresponding page. The locations page shows a map with the 4 SUNY locations and some details, The ‘Graduation ….’ Link shows a graph showing the graduation rates of the 4 universities (progression over 12 years), and ‘Profile…’ shows a spreadsheet page with more info about the 4 universities. 

Architecture and Concepts:

The project is a Web Application aimed at comparing the detailed profiles of the four SUNY University Centers: Buffalo, Binghamton, Albany, and Stony Brook. The application uses the following visualizations: a) a map showing the locations of the 4 SUNY UCs with the State of New York, b) line plots showing graduation rate progression of the SUNY UCs over the last twelve years, and c) a chart that shows enrollment details and the latest graduation rates. This should be useful for prospective college applicants to decide which one of these University Centers to go to as a College Freshman.  Below are the details of how the program is structured:
•	Data Source:  The project uses two JSON URL API endpoints: a) https://data.ny.gov/resource/a5je-8vxp.json -  the data set has certain profile information such as location, enrollment, majors, etc. of all sixty SUNY institutions within NY State, and b) https://data.ny.gov/resource/dv3t-9r67.json - the data set has 4-year, 5-year, and 6-year graduation rates of all SUNY institutions covering the last twelve years. The documentation regarding these endpoints are at https://data.ny.gov/Education/State-University-of-New-York-SUNY-Campus-Locations/3cij-nwhw?institution_level=4-year and https://data.ny.gov/Education/Graduation-Rates-for-Students-Enrolled-in-Baccalau/db76-68yz respectively. 
•	Process the Data: The data set from the first API endpoint was filtered to retrieve only the records of the 4 SUNY UCs. Further, the data was processed to only retrieve the location information for the first visualization. Similarly, the data set from the second API endpoint was processed to retrieve only the four-year graduation rates of the 4 SUNY UCs. 
•	Visualizations: The location link in the Welcome page shows the 4 SUNY UC locations in a map and graduation link in the Welcome page shows a plot of the graduation rates over the last twelve years for the 4 SUNY UCs using the ploty JavaScript library to render on the web browser. The profile link in the Welcome page is a chart visualization that combines the enrollment details from the first API and the latest 4-year graduation rate from the 2nd API and presents them in a chart in the front-end. That page is also rendered using the plotly JavaScript library. 
•	Web Server, Data Retrieval, and Routing: To retrieve the data from the Data Sources, a webserver was implemented (server.py) using the Python bottle library. Usage: localhost:8080 shows the Welcome Page. Clicking one of the three links to the visualizations does the following:
o	Corresponding static html page is loaded using the paths defined in server.py. 
o	Each page is rendered using JavaScript rendering code called from the <body onload…> tag in the corresponding html page (Example: graduation_rates_plot.html has a call to loadPlot() in the <body onload..> tag which is implemented in plot.js file).  
o	The loadPlot() function uses a GET request to the ‘/suny_plot’ path.  
o	Server.py handles the ‘/suny_plot’ path by calling sunyData.get_suny_plot_data with the corresponding API endpoint to json as the argument (https://data.ny.gov/resource/dv3t-9r67.json). 
o	Get_suny_plot_data uses the python libraries urllib & json to access the Data Source and formats it to be rendered in plot.js. 
o	The loadPlot() function is asynchronous. When the data is ready, the data structure for plotly is constructed using a call to getPlotParams with the data returned. The returned data is used to plot the graph using Plotly.plot. 
