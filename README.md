# CS566_project
MSD final project

## Project Name :  *Online Complaint Management System* ##
#### Author : *Jyoti Raj Khatri*

### Project Details ###
A web application  where clients can log in and register multiple complaints, upload the files related to the complaint, track the progress and status of each complaint registered based on ticket no. Also, can view important contact information. Admin (complaint management administrator) receives an email notification about each registered complaint, provides a response, tracks the progress, and updates the status. Admin can create, edit, and delete important contact important list.

##### Technology #####

• JavaScript, Node, Angular, MVC Patterns, REST APIs, JWT, State Management, Redux, Cloud Deployment(AWS)

##### Functionalities #####

• Sign up/sign in (Use JWT for authentication and authorization)

• Validation

• Two types of users   
    1) Clients    
      - signup /login 
      - create complaint, 
      - upload documents,
      - view update and status of each complaints,
      - view important contact information,
      
    2)Admin
      - login
      - receive email once complaints is register by clients
      - view all complaints
      - process unseen complaints
      - provide feedback and update on each complaints
      - change the complaints status: Unseen, Inprocess, Completed, Inappropriate
      - create, view, edit and delete contact information
• Email notifications.  
• Store uploaded file in cloud(AWS S3 bucket).
