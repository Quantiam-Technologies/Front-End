
Change Log

# Known Issues, To do List

#Tapecast App
- Make Beakers work
- Steps Tapecast

#Tile Creation App


#QAQC

- Non conformance thin square tiles
- Non conformance concavity 
- Genearte Barcodes for existing tiles
   
- Force recalculation of weekly overhours after an RTO request for the given weeks.
- Overtime hours should update after a hours change. 


### Known Issues

- Material Supplier dropdown, does not clear properly when declining to create a new tag.
- Cartesian XRD eva format does not include steptimes... hmm.
- XRD runs are no longer syncing, this is because the XRD computers are off the network. 

### To do list

- Overlays for XRD viewer 
- Display (fix) EDS data display in the SEM viewer 
- keywords for material searches 
- Bug:: Approving an RTO doesn't doesn't trigger the timesheet calculation process.
- Add merge material function
- Steel Creation Dialog
- Active / Inactive filter for Employee Screen
- Material Container Creation Rework ---- Supplier -> Select Material From List  , reduce duplicate Materials


# 2023.01

## Timesheet

- Resolved an error where the timesheet overhours would not display, causing the loading icon to never end. 
- Resolved issue where newly created projects could not be updated. 

# 2022.01

## Changes 
- Can now download XLS files from the SEM viwer app
<br><img  style="margin:5px;" src="https://imgur.com/rpgVDG5.png" width="80%"><br>

## Fixes

- Fixed pagination for all database screens. 
- Arbin EIS graphs now load again
- The "more" chip no longer looks bad 

# 2021.48

## New

- Prototype Tapecast Forms released

## Fixes 

- Timesheet now updates the overtime box in real time, no longer requring the screen to be refreshed to updated daily, or weekly over time amounts.  

# 2021.47

## New 

- Framework overhauled to Angular v13 from v10 --- whew. Enables new modern development to start. 

## Updates

- Active Tabs have a more visible color scheme

## Fixes

- SEM Images no longer have an annoying carousel
- Selected SEM images that don't have additional data, no longer display the previous selected images additional data.
- Removed Swal Notifications from the RTO approval application, RTOs can now be approved again.

# 2021.45

### Updates

- Particle Size Database Screen now has a refresh button
- Particle Size Database columns can be resized



# 2021.8

### New

- Particle Size Database v1  <br><img  style="margin:5px;" src="https://imgur.com/HqTXocq.png" width="80%"><br>
- Mastersizer Timesheet now automatically updates the last 17 days on a daily basis, ignores current day activities. 

### Changes 
- Container view now links XRD, SEM & Particle Analysis  <br><img  style="margin:5px;" src="https://imgur.com/uZZrZCn.png" width="50%"><br>
- Container database now indicates related analyses in icon format <br> <img  style="margin:5px;" src="https://imgur.com/5NcmVEM.png" width="30%"><br>


### Fixes

- Column menus on database tables are now a visible white  

# 2021.7

### Changes

- XRD database will now update on a daily timeframe. Assuming someone bothers to move data from the XRD computers to the Q drive.
- XRD database now automatically links QCIDs to containers if a QCID is found in the analysis name. <img  style="margin:5px;" src="https://imgur.com/6tyP6i9.png" width="80%"><br>
- XRD database now checks for missing EVA files and alerts XRD managers & QA/QC on an hourly basis. <img  style="margin:5px;" src="https://imgur.com/p0amFgw.png" width="50%"><br>
- XRD viewer now defaults to images found on the Q drive first, rather then patterns in the graph. 

# 2021.4

### Changes

- XRD database is now searchble for 2020. It will only reflect what XRD data has been transffered to the Q drive.  (Lags by one month+ )

### Fixes

- Timesheet -> Settings -> Machine page Operators popup works again

# 2021.1

### Changes

- RTOs vacation time can now be taken in 1 hour increments, reflecting the change in RTO policy, effective 1-Jan-2021.
- Arbin graph x axis now defaults to Step_Time
- Arbin graph exports now default to  1920x1080 px (16:9)
- Arbin database doesn't reload every time you visit the page

# 2020.50

### Fixes

- Because 2020 loves being different, the timesheet now supports a unique 27th payperiod for 2020. 

# 2020.45

### Fixes

- Patch note history and contents now scroll indepedantly. 
- The current patchnotes you are viewing are now highlighted in the history column 

# 2020.43



### New

<img  style="margin:5px;" src="https://www.mindinventory.com/blog/wp-content/uploads/2020/07/angular-10.png" width="100%"><br>
- Upgraded to Angular 10, a slew of modifications for compatibility, some bugs may still arise. 


### Changes

- Added a save button to the QCID registry in the create container window



### Fixes 

- An issue where SEM images would not display if they had the character "+" in their filename, has been resolved. 
- An issue preventing SDS uploads for with certain special characters was resolved
- An issue preventing new SDS uploads to older materials was resolved   
- You can now select a scanner from the header bar again. 
- The menu on the left side, no longer has annoyingly off center menu items in the Time Tracking section. 


# 2020.39


### Fixes

- The scale bar tool no longer fails when it encounters capital X letters in file names when determining the magnification to stamp things with.
- The material SDS system no longer fails when it encounters special characters such as "%" when trying to save an SDS.
- The J6 SEM automatically syncs files to the Q drive once again within a few minutes, allowing the SEM viewer app to be usable.  
  

# 2020.38

### New 

- A campaign select dropdown has been added


### Changes

- Employee View | employee type field option "Temporary" now reads "Contract/Temporary"

### Fixes 

- You can now delete Stat Holiday hours without getting an error
- User Hierachy page is readable again


# 2020.35

### Changes

- Email notifications are now sent out for NCR completion
- Email notifications are now sent out for CAR updates. 

# 2020.34

### New

- Corrective action reports now have a database screen. Double clicking an entry will view the CAR.<br><img style="margin:5px;" src="https://imgur.com/XroAi7Q.png" width="100%"> 

### Changes

- An employee can no longer be edited until it is assigned an employeeID.
- Added a confirmation notification for changing someone's supervisor, and various other actions on the employee viewer. 
- You can now navigate to a Corrective action report through url using the ID -- apps.edm.quantiam.com/quality/car/{id}

### Fixes

- The employee database will no longer navigate to a null value employeeID. In the absence of an employeeID, the database ID is used.  

# 2020.31


### Changes 

- Auto-Scale Bar Tool can now be forced to stamp images with a magnification of your choosing, as opposed to one written in the file name. This allows you to auto stamp folders of images without renaming every file. <br><img style="margin:5px;" src="https://imgur.com/F1ZOv40.png" width="100%"> 

### Fixes

- Auto-Scalebar Bar Tool now uses correctly sized scalebars for the new Axio Camera. It was using scalebars for the old camera. 

# 2020.28

### Changes

- A handheld scanner can now be used to scan QCID codes when registering a container. 

### Fixes 

- Fixed an issue where .rpt and .xps files were crashing the SEM run viewer. 


# 2020.23

### Changes

- To reflect policy HRD-0001H, Updated May 2020 --- Hourly CTO now accrues at a rate of 1.0x, instead of 1.5x. The timesheets no longer indicate a 1.5x modifier. 

- You can now print off the absence calendar <br><img style="margin:5px;" src="https://imgur.com/reMPGMc.png" width="100%">

- Column filters were added to the Bank History table

# 2020.20

### New

- Purity is now an optional attribute of a material, which communicates how pure a material might be, eg 99.5%, or 99.9%. This is distinct from a material grade, which identifies the class of material. All relevant creation or search dialogs have been updated with this property. <br><img style="margin:5px;" src="https://imgur.com/1DskLBB.png" width="75%">  

- A searchable 3d Model database has now been prototyped utilizing the autodesk data management api. Now accessible on the side bar menu under "3d models", or /3dmodels/database<br><img style="margin:5px;" src="https://imgur.com/So00VQP.png" width="75%">

### Changes

- An error notification should now display when an RTO allocation doesn't save properly. 

### Fixes 

- When viewing a container, the latest SDS will now displayed, rather then the oldest. All historical SDSs are available in the historical SDS tab. 
- Fixed an Issue where a stat holiday would accept "8", but not "8.0". 
- The "Active Employees" filter now works as expected for the user rto bank status report. 


# 2020.16

### New

- Quality Section Added
- Non Conformance Report Database Prototype
- Non Conformance Report Prototype 

### Changes

- You can no longer enter less then 8 hours on a stat holiday

# 2020.12

### New

- The material container wizard now attempts to prevent duplicate material creation. The wizard will search the database for similar materials and prompt you to select one if it thinks the material is similar. If the entered material has the same name, grade & supplier as something in the database, it will automatically select it. 

### Fixes

- The previous SDS will no longer show when navigating to a material without an SDS from a material that has an SDS. 
- The supplier select box now recognizes clear events. 

# 2020.11

### New

- Web application is now developed using Angular 9 (more impressive then it sounds)
- You can now update the SEM timesheet & run durations from the SEM database screen. 
- Added a datatable to the monthly distribution chart on /timesheet/insights/company
- Insight Category: Unpaid hours & Cto awarded<br><img style="margin:5px;" src="https://imgur.com/n7Bnyy1.png" width="75%">
- Insight Category: Employee headcount / Active Timesheet Users
- Historical SDS's are now visible on the material container page  
- Employees section is now divded into Directory, and Hierarchy
- An administrative hierarchy dynamically generated from the database is now viewable<br><img style="margin:5px;" src="https://imgur.com/h1BMssM.png" width="75%">

  
### Changes 

- Timesheet 'Statistics' was  changed to "Insights" to better reflect normative industry  terms
- User-hours report regular column  changed to "Hours worked"
- Lot selecter now uses the ng-select library
- Select2 plugin removed 
- RTO Calendar now displays holidays<br><img style="margin:5px;" src="https://imgur.com/uwP40aL.png" width="75%">
- The SDS upload box on the material container page is now hidden until activated with the upload button. 


### Fixes

- Timesheet Reports and Settings now open the first tab by default 

# 2020.05

### New

- A hazard and empty column was added to the material container DB screen
- A hazard, supplier and location filter was added to the material container DB screen

### Changes
- The chemical inventory list is now downloaded from a button near the top of the material container DB screen

### Fixes

- Container dropdown now once again properly searches qcid, grade and lot

# 2020.03

### Fixes 

- Users who have unpaid entries will now have their overtime calculated properly.
- Adding an SDS no longer causes the application to continually "think". 
- Adding multiple containers no longer duplicates materials.
- RTO Allocation for 2020 works as intended  

# 2020.01

### Fixes 

- You can no longer submit a RTO without having hours, date & type value selected. 
- An issue where Manual CTO bank changes were appearing in the printed timesheet was fixed. 

# 2019.52

### New

- For quality control reasons, the Material Creation Dialog has been revamped into a step by step wizard. This wizard also includes SDS inputs. <br><img style="margin:5px;" src="https://imgur.com/ZjJUv1p.png" width="75%">
- When creating a material you can now create multiple containers with one button (yay!).<br><img style="margin:5px;" src="https://imgur.com/8nCvBpF.png" width="75%">   
- You can now add WHMIS 2015 symbols to materials, this will be useful for future label printing & searching by warning label.
<br><img style="margin:5px;" src="https://imgur.com/MoiSOvE.png" width="75%">

# 2019.50

### New

- If a new SDS is uploaded to a material, the old SDS will be moved into a historical SDS directory. The historical filename will contain the date it was originally created. <br><img style="margin:5px;" src="https://imgur.com/KBazZCs.png" width="75%">
-  Added a container trait called "empty" to track if a container is empty

- The change log now has a scroll bar to facilitate navigating version histories

- You can now view the Material Container  change log <br><img style="margin:5px;" src="https://imgur.com/zy4ef7X.png" width="75%">

- You can now view the log for Timesheets you have access to. <br><img style="margin:5px;" src="https://imgur.com/kLry5KH.png" width="75%">

### Changes

- Material container card actions items are now found in the title bar.
- The SDS upload box is visibile at all times, allowing you to update the SDS at anytime
- The material container analysis tab will be visible at all times. 

### Fixes

- Changing a material name no longer breaks retrieving an SDS, accordingly the SDS name will be updated on the Q drive. 
- Display issue for summary table on the timesheet statistics page resolved

# 2019.44

### Fixes

- Deleting an approval will now remove hours by request ID, not by hours/date/employee.
- Timesheet statistic graphs now credit Quantiam Technologies
  

# 2019.42

### New
- Filters for steel & material containers have been added to the SEM database screen
- Delete buttons were added to the Projects Screen
- You can now view, add and remove operators from the machine screen.<img style="margin:5px;" src="https://imgur.com/lgpmmjB.png" width="75%">
- The holiday screen now allows you to navigate years, create new holidays and delete future holidays.<img style="margin:5px;" src="https://imgur.com/h9jjDuS.png" width="50%"> 
  
### Changes
- Associating a container/steel with XRD or SEM run is now done through a new popup dialog<img style="margin:5px;" src="https://imgur.com/w9dwTem.png" width="75%">
- An active employee filter option was added to timesheet report known as "User Hours".  


### Fixes 

- SEM is viewer is more responsive in smaller windows.
- The steel select box will now search for Steel IDs
- The Container Select box will now search for QCIDs 
- RTO Allocation will no longer show employees who were not employed during the year selected

# 2019.40

### New

- The container view will now display associated active containers of the same material, click on the row to navigate to that container.<img style="margin:5px;" src="https://imgur.com/Cd2bnMp.png" width="75%">

- If a container has related XRD, an analysis tab will show up at the top. Click it the view the XRD spectra.<img style="margin:5px;" src="https://imgur.com/B472Xqq.png" width="50%">

### Changes

- Material select dropdown now shows the last few QCIDs in the subtext. <img style="margin:5px;" src="https://imgur.com/8MMTDIh.png" width="75%">
- The SDS box in the container view has been moved to the right side. 
- The container attributes box is now on the left side
- The Material Information box is now similarly styled to the container box. 

### Fixes

- hours with a decimal caused the "8 hours a day" warning to improperly trigger
- An SDS that won't load, will no longer be displayed.<img style="margin:5px;" src="https://imgur.com/0ZvSKGk.png" width="50%"> 
- XRD Patterns are now on a seperate yAxis, and will no longer extend into nothingness
- XRD Pattern cards are now smaller
- The database will now automatically capitalize material names
  
# 2019.39

### Changes

- The material creation screen will now politely remind you to search the database for pre-existing materials.
- If an RTO request will result in a negative balance, a confirmation dialog will now appear.  

# 2019.38

### New

- SEM & XRD runs can now be associated with material containers and steel. Clicking on the buttons will navigate to their respective screens. <br>
  <img style="margin:5px;" src="https://i.imgur.com/8spYB81.png" width="50%">
- A prototype pop up for steel objects was added. 
- The [steel database](http://apps.edm.quantiam.com/steel/database) screen has been somewhat reconstructed, filters will be next.

### Changes

- The material database screen will now show inactive containers.
- You can now add "Particle Size" as a property when creating & editing materials. 
- Side menu options will now highlight on hover. 
- Salary employees can no longer print timesheets without 8 hours accounted for on a weekday they have worked

### Fixes

- D8 XRD runs are now [syncing properly again](http://apps.edm.quantiam.com/xrd/database)
- Container dropdown spacing issues resolved
- Material Container page is more responsive on smaller screens
- A display error where some project names on the timesheet were being truncated at the start, rather then at the end, was resolved.


# 2019.37


### New 

- Patch notes can now be found in the top navigation bar
- Patch notes are now in a popup window and will display if you haven't see them before
- Implemented [calver semantics](https://calver.org/) for tracking website versions, the current format is YYYY.MM.W.minor
- The aforemention version number now appears in the footer, on the bottom left side. 

### Changes

- Users can no longer print timesheets if they are Salary or Hourly and have less then 2 hours on a weekend. 
- The create container button has been turned into a new blue button on the top right of the container list.
- The container list now sorts by last entered container
- The container list will now refresh after a new container is added. 
  
### Fixes
- The date display error for timesheet report project-hours start date field was resolved
- Start and End time now reset when you change the hours or type of RTO. Prevents users from adding 8 hour request with time ranges.
- Payout comments now save properly.
- Payout creation button is now called "Create Entry", to better reflect its universal usage.
- Images now display again in SEM viewer, the image viewer broke, trying to find a better replacement.





# 2019.08

### Arbin

- Can now browse Arbin Tests
- Can now view basic Arbin Data, and change axis
- Can now overlay runs
- Can toggle between EIS and IV Data
- Can download CSV files for loaded Data Sets

### XRD

- Now displays a link to the eva file

### Timesheet

- You can now edit stat holidays manually. 
- Fixed a time conversion bug for the start and end date fields. 



# 2019.07


### General

- Drop downs were reverted to a previous working version

### RTO View
- Extraneous decimals removed on RTO Bank Impact card

### Timesheet

- Revised the time entering popup to be more minimalist
- Pressing enter now navigates "down" after entering a value
- Can no longer edit project names
- Fixes for cases of the dropdown not showing what was selected

### Timesheet Projects
- Can now create new projects
- Can now edit existing projects

### Timesheet Bank History
- UI fixes for scrolling and person dropdown

### Machines

- Navigation: Timesheet -> Settings -> Machines
- Can view machines with appropriate permissions
- Can edit machines with appropriate permissions
- Can create machines with appropriate permissions

### Statistics 
- User statistic dates now work as expected. 

### SEM 

- The top row of images will now become a carosel when there is more then the screen can display. 

### Users 

- Display issues for RTO and groups fixed

### XRD

- Database overhauled to account for XRD Runs without Analyses
- Now accounts for multiple analysis files per XRD Run
- Project Filter Added
- Refresh Button Added
- Data Storage Location link

### XRD View

- Now displays the spectra collected
- Now displays patterns for each spectra, can modify their yscale, width and visibility 
- Pattern controls added, line width & scaling
- Chart controls added, Y/x Axis Min/Max
- CSV Print button
- Images and the image tab will pop up when they are found on the Q drive

#  2019.06

### Dev Tools
- You can now browse application as another user

### General 

- Updated to Angular 8
- Prototype pop up for hovering over steel objects 
- Quantiam Themed Tables now have softer edges

### Users
- Table changed into Quantiam style
- Added Direct Line property


### Comments
- Comment component with Ckeditor5 WSYWIG
- Can edit, delete comments
- Can only delete own comments. 

### Calendar
- now no longer displays time off booked beyond an employee's leave date

### Timesheet

- Category rows expand when clicked on
- editor should now have a popup which gives context for which cell you are editing
- Machine timesheet printouts now display the denomination in cell B4
- In the Footer, Total now displays the denomination in brackets after it
- User/Machine selection is no longer clearable


### Timesheet Bank

- Constructed the timesheet Bank
- Navigate to timesheetes & RTOs
- Conduct payouts with proper permissions
- Edit Comments
- Filter by indvidiual & rto type

### Timesheet Statistics User
- Can now query your own data into the past
- Can now query for your subordinates / machines in the past
- Fancy Pie Charts
- Raw, and Aggregate Tables
- Adjust for start Date and end Date
- Defaults query is start of current year and current date.
- Added Statistics option to side menu

### RTO 

- Database table should properly care about the user's permissions for subordinates/viewing
- When creating an RTO, it should care about the user's subordinates/permissions
- Approvals now work as expected
- Rto Bank Impact added
- Conflicts are no longer cards, and instead a column in the table with a popover to show which ones.
- Comment Box added

### SEM

- Moved back to fetching images individually, route was sending every image encoded via the api, performance increase

### Container Select Dropdown

- No longer deletes options when cleared
- No longer queries for container pages that aren't there. 

### Tools 

- Button no longer stays disabled after a processing run.

# 2019.05



### Timesheet

- Fixed stat holiday editing bug
- User selection dropdown now respects permissions.
- Built Projects, Holidays, RTO Allocation, Reports tabs
- User Summary Usage Report is now functional
- Fixed Display of Machines in the user list, navigating to machines and downloading timesheets

### Timesheet Statistics
- Added a Company view, which breaks down timesheet hours on a categorical basis
- Fancy pie chart
- Fancy monthly hours as a percent time chart. 

### Material 
- Adding a material now uses the new select-material component
- Removed property Catalog, this will be changed into a container property 

### Material Container
- Added a container expiry field
- New info blurb about where Safety Data Sheets (SDS) are stored on the Q drive

### RTO
- User selection dropdown now respects permissions

### RTO View
- Added timerequest table, can add or remvoe requests
- deleting a request now navigates back to the database and refreshes the RTO table

### SEM
- Data storage location now displayed
- Auto refresh functionality, with computer sepecific settings toggle.
- Image data is now displayed

### Other
- fixed tab CSS to better handle overflows
- Ag grid updated to 20.1.0
- HandsOnTable added in for quick tabular display, stil can't figure out how to copy with headers. 
- Select MAterial component now works as intended
- Replaced select2 supplier dropdown, with ng select, to fix display bug
- Auth screen font resized

# 2019.04

### Users
- Can add permissions to individual users now

### Timesheet 
- Fixed navigation to remember what time sheet you were on when you click the timesheet
- Known issue: timesheet category does not highligh using dynamic router link
- Weekends now properly highlight regardless of timesheet state

### Materials Inventory
- Can now print off large labels with bar codes for scanning. 

### Misc
- eliminated caps lock bug when scanning materials


#  2019.03

### SEM
- Can now select run types
- Can now refresh the data table
- Fixes to keyboard commands and when using filters

### Misc
- User select box will now hard check for employee ID, typing 1 will now select Robert

# 2019.02

### TGA
- Peak tool now has "previous" and "next" buttons for navigating single runs easier
- Peak tool now clears selection properly
- Fixed a bug where the graphs would not delete when expected

### Users
- Can now create and delete RTO Allotments on the user view screen
- Added a group tab to the Managment box

### Timesheet
- Can now view timesheet data on a per user basis
- Machine Timesheets can now be viewed
- Hours, Overtime, RTO and Bank tables exist
- RTO Calendar rebuilt, has all previous functionality 

### Sidemenu
- Added Timesheet Category
- Sorted SGX towards the bottom
- Instruments now has a SEM category

### Materials

- Containers now require R&D L1 or Manufacturing Access to edit / create 
- The container screeen will now try to search online for a relevant MSDS
- You can now save SDS sheets in this application. 
- The material database now displays if a SDS is on file.
- All SDS sheets live in Q:\Administration - All Staff\SDS 

### SEM 
- SEM database now works with server side querying
- Various fitlers tested and working

### XRD
- Xrd database now works with server side querying

### Other

- Select2 boxes now have proper padding for placeholder text


#  2019.01

### Misc
-  Auth screen no longer locks you out when you fail your password.
-  Updated to Angular 7.2
-  Login button now visible

### Materials / Containers
   
- Materials screen now preserves itself when navigating around. 
- You can now delete containers, after deleting one you are redirected to the database and the table refreshed
- A drop down for searching maerial containers now exists

### TGA
- TGA Peak Tool for SGX analysis added   
- Peak Tool: Added a table to show selected runs, ability to export raw data
- Peak Tool: Added basic graph controls to multi graph mode



#  2018.12
### General
- When the application is "thinking", a loading bar will be displayed at the top of the screen. 
- The select scanner box is now hidden by default, but can be toggled with the target button by the user's name.
- Styling improvements for module navigation bars. 



# 2018.11
### Angular 
- Updated from Angular 7.0 to 7.1  

### General
- Implmented basic caching for named routes, this means that when users are navigating to and fro a table, the settings, filters and searches will be saved.  
   
### User
- RTO Allotment can now be viewed from the user screen  
- RTO Allotments can now be edited by those with sufficent permissions  


