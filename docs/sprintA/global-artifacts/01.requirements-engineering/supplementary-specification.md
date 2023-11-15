# Supplementary Specification (FURPS+)

## Functionality

_Specifies functionalities that:_
- _are not related to US/UC, namely: Audit, Reporting and Security._

- Use cookies to track users;
- When a user tries to access a non existing page it should return a blank page;
- Use JWT tokens to grant access to the forum;
- Login and Logout should be possible.
- Uses DTO´s in the communication of sensitive data between the client and the server;


## Usability

_Evaluates the user interface. It has several subcategories,
among them: error prevention; interface aesthetics and design; help and
documentation; consistency and standards._


 - Intuitive interface: The forum has a user-friendly design with clear navigation menus and intuitive controls.
 - Responsive design: The forum is accessible and adapts to different screen sizes.
 - Rich text formatting: Users can apply formatting options (e.g., bold, italic, url links and code format) while creating posts.
 - Allow to post images: Users can post small images in their posts and comments.
 


## Reliability
_Refers to the integrity, compliance and interoperability of the software. The requirements to be considered are: frequency and severity of failure, possibility of recovery, possibility of prediction, accuracy, average time between failures._


- High availability: The forum is accessible and operational with minimal downtime.
- Error handling: The forum  handles errors and provides helpful messages to users.
- Concurrent user handling: The forum can handle multiple users interacting simultaneously without issues.


## Performance
_Evaluates the performance requirements of the software, namely: response time, start-up time, recovery time, memory consumption, CPU usage, load capacity and application availability._

- Fast page loading: The forum has optimized page loading times and responsive user interactions.
- Efficient database queries: Database queries are optimized to retrieve forum data quickly.


## Supportability
_The supportability requirements gathers several characteristics, such as:
testability, adaptability, maintainability, compatibility,
configurability, installability, scalability and more._ 

- User feedback and bug reporting: Users can provide feedback and report bugs for continuous improvement.
- Compatibility: The forum is compatible with popular web browsers and operating systems.
- Scalability: The forum can handle a large number of users and forum activity.


## +

### Design Constraints

_Specifies or constraints the system design process. Examples may include: programming languages, software process, mandatory standards/patterns, use of development tools, class library, etc._
  

- Visually appealing design: The DDD Forum has a visually appealing and consistent user interface.
- Efficient coding practices: The forum utilizes efficient coding practices and follows best practices in software development.
- Adherence to standards: The forum adheres to web standards and best practices and a clean architecture combined with Domain-Driven Design.



### Implementation Constraints

_Specifies or constraints the code or construction of a system such
such as: mandatory standards/patterns, implementation languages,
database integrity, resource limits, operating system._


- Visually appealing design: The DDD Forum has a visually appealing and consistent user interface.
- Efficient coding practices: The forum utilizes efficient coding practices and follows best practices in software development.
- Adherence to standards: The forum adheres to web standards and best practices and a clean architecture combined with Domain-Driven Design.
-Built based on: Clean Architecture, SOLID principles and Domain-Driven Design best practices using TypeScript.


### Interface Constraints
_Specifies or constraints the features inherent to the interaction of the
system being developed with other external systems._

- Notifications, warnings and alerts should be implemented using [Toastify](https://fkhadra.github.io/react-toastify/introduction/);

APIs: The DDD Forum provides APIs for third-party developers to create extensions or plugins.
Compatibility with other systems: The forum is designed to integrate with other forum software or content management systems.


### Physical Constraints

_Specifies a limitation or physical requirement regarding the hardware used to house the system, as for example: material, shape, size or weight._

(fill in here )