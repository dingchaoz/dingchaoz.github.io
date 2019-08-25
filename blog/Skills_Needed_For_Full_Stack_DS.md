Author: Dingchao Zhang


## Engineering Tool Stacks:

### Operating System
Your choice of operating system matters probably more than you think to your data science development and deployment work flow. Following points
describe why Linux/Mac will make you a better developer and saves you hundreds of hours fixing issues you might come across in Windows.


- Portability: if you design your workflow for Linux, it will run almost anywhere, on any cloud provider. Linux also dominates supercomputers, if you ever decide to go big.

- Productivity: The Terminal. You will be surprised just how aware and productive you are once it becomes your primary environment.

- Compatibility: Most libraries used in data research are primarily Unix-based. Python, with all its dependancies, is much easier to install and run on Linux; many libraries will first released in Linux compatible version, and Windows runnable will come usually months after it.

- Stability: An application that hangs mid-process can be a real productivity killer. Linux will be respectful of your time.

- Community: if you do run into a problem on Linux, the solution is likely to be the top search result on Google, and the community is very supportive.

- Control: Being able to monitor and control your hardware resources is very important when we deploy a technology solution that needs permission/ access to computer resources. Linux makes that easy.

- Speed: No latency, things are generally faster in Linux than Windows.

### Code editor

Using rich-featured IDE(Integrated Development Environment) or a lighter code editor comes down to personal preferences. I like to use smaller and quicker code editor, and I use Atom.

Atom is available on all platforms, Atom is billed as the “hackable text editor for the 21st Century.” With a sleek interface, file system browser, and my favorite is the marketplace for extensions.

Highly recommend the following extensions/packages to be installed in Atom:
https://atom.io/packages/atom-beautify
  Beautify your python script
https://atom.io/packages/python-autopep8
  Format python code using autopep8
https://atom.io/packages/docblock-python
  Inserts documentation blocks for python functions

### Virtual Environment

Imagine a scenario where you are working on two python projects and one of them uses a Pandas 1.9 and the other uses Pandas 2.0 and so on. In such situations virtual environment can be really useful to maintain dependencies of both the projects. Virtual environment is a tool helps to keep dependencies required by different projects separate by creating isolated python virtual environments for them.

If you are using Python 3, then you should already have the venv module from the standard library installed.

Tutorial of venv: https://realpython.com/python-virtual-environments-a-primer/

### Package your python project -- setup.py

Package your code to share it with other developers and users makes a great impact. Just like how we install packages using pip and PyPI, packaging your project in a well-established distribution convention makes it easy to share.

Setup.py is the build script for setuptools. It tells setuptools about your package (such as the name and version) as well as which code files to include.

setup() takes several arguments.

- name is the distribution name of your package. Choose a memorable and unique name for your package.
- version is the package version see PEP 440 for more details on versions.
author and author_email are used to identify the author of the package.
description is a short, one-sentence summary of the package.
- packages is a list of all Python import packages that should be included in the distribution package. Instead of listing each package manually, we can use find_packages() to automatically discover all packages and subpackages.
- classifiers gives the index and pip some additional metadata about your package, usually including: python version, license, etc.

More read of package python:https://packaging.python.org/tutorials/packaging-projects/


### Clean code rules

- Functions should do one thing
This is arguably the most important rule in software engineering. When functions do more than one thing, they are harder to compose, test, and reason about. When you can isolate a function to just one action, they can be refactored easily and your code will read much cleaner. If you take nothing else away from this guide other than this, you'll be ahead of many developers.

- Function names should say what they do

- Use docstring
A docstring is a string literal that occurs as the first statement in a module, function, class, or method definition.All modules should normally have docstrings, and all functions and classes exported by a module should also have docstrings.
For consistency, always use """triple double quotes""" around docstrings.

additional docstring reading: https://www.python.org/dev/peps/pep-0257/#what-is-a-docstring

### Test driven development

Unit testing is not generally considered a design pattern; in fact, it might be considered a “development pattern,”. Test-driven development (TDD) is a software development process that relies on the repetition of a very short development cycle: requirements are turned into very specific test cases, then the software is improved so that the tests pass. TDD recommends developers to write test first before writing actual code. The benefits are

- It forces us to describe what the code is supposed to do
- It provide an example of how the code should be used
- It Provide a way to verify when the code is finished (when all the tests run correctly).

I recommend to use Pytest framework which makes it easy to write small tests, and scales to large applications.


### Git
  versioning
  branching
  merging
  pull requests
  issues


### Web server
  flask, more to come


### Serverless
  lambda, more to come

### Docker
  more to come

### Kubernetes
  more to come


## ML/DS/Stats/SQL knowledge

### General ML:
Highly recommend reading through Applied Predictive Modeling book.

- Data scientist shall feel very comfortable describing the pros and cons of different algorithms, when and when not to use certain of them.

![ML algorithms Family](ml_map.png)

- Model Selection, Validation
  example questions:
  how does cross validation work?
  how to select the right model?

- Data manipulation
  Expect to get lots of questions in data manipulation, typically data scientists spend more than 60% of the time cleansing, transforming data at work.
  example questions:
  how do we deal with outliers, nans, missing values, highly skewed variables, highly imbalanced datasets ?


- Feature engineering
  example questions:
  what are the common techniques for feature engineering?
  when shall we scale/standardize/normalize data?
  how do we deal with high cardinality categorical features ?
  how to find relevant features among 1000 variables?
  how to deal with multicollinearity, why it matters?


### Deep learning:
  - Computer Vision/ CNN:
    - can explain different variants of CNN models used for image detection/ identification/ segmentation
    - opencv
  - NLP/ RNN:
    - can explain and expand to elaborate on the pros/cons different variants LSTM/ word embeddings/ attention mechanism/ transformer

  - Prepare to answer the data manipulation(image/text processing,etc), feature engineering(bag of words, embeddings, tf-idf, etc) related questions for deep learning models.

### Reinforcement learning
  more to come

### Recommendation System
  more to come

### Time Series Analysis: ARIMA
  more to come

### Optimization: linear programming, dynamic programming, multi-task optimization
  more to come


### SQL:
  nested select query, different joins, window function(lag, lead, rank,etc)
  https://drill.apache.org/docs/sql-window-functions-introduction/
  https://sqlzoo.net


### Stats: A/B testing


## Projects
###  Project Selection Guideline

When we are working as a data scientist in industry, we are typically required to deliver solutions that are 'good enough' in a limited amount of time, unlike an academic research project, we may not have the luxury of time to find the best and optimal solution. It is very important to hava a sense of various tradeoffs between different approaches, and pick one that's well-suited to the problem and resources we have.

How do we pick a project that reflects this mindset? Here are some general guidelines:
- It it a real problme that someone would care about?
  Ideally, the result our project could be sth you apply directly at work, and we can add it to your portfolio and brag about it.
- Is there a real data available?
  We want to work on a project that has real-world data, not a toy dataset or a data set that's used only for academic teaching purposes.
- Is the data easy enough to acquire and clean?
  Pick a dataset that is relatively clean, as a rule of thumb, if we have to spend more than week acquiring and cleaning the data, we may want to reconsider.
  
### Project Milestones
1. Pick initial project ideas. Use mentor as a soundingboard and filter.
2. Write project proposal. A short blurb
3. Data collection.
4. Data wrangling.
5. Exploratory data analysis.
6. Modeling.
7. Production.
8. Deployment.


By the time you’re done with this program, you’ll be:

Adept at data wrangling and machine learning at scale
A pro at working with neural networks
A master at leveraging data science and ML engineering to create and deploy a complete AI system to production.

we follow a project-based learning model to ensure that every skill you acquire maps to a deliverable in a real-world project. This means that the course curriculum is set up to help you successfully complete your mini-projects and capstone project, which closely mimics an end-to-end machine learning engineering project in a professional setting. 

That said, the course, like the capstone project, is divided into two phases. The first phase of the capstone project focuses on building and scaling a working prototype, while the second phase focuses on deploying your prototype to production. Below is a roadmap of the different capstone deliverables you'll work on throughout the course. The multiple paths outlined in phase 1 are the different paths you can take based on the kind of capstone project you decide to work on. 

### Tech Refresher

1. [Git](http://rogerdudler.github.io/git-guide/)
Take a peek at this simple guide that covers everything you need to know to start using Git. Topics range from downloading Git for your OS system to creating your own repository, as well as branching and merging.

2. [Collaborating with Git](https://www.atlassian.com/git/tutorials/syncing)
This BitBucket tutorial shows you how to collaborate on projects using Git, an important skill to have, as you’ll use Git to work with a mentor. This resource also includes some tutorials that cover advanced Git functions.

3. [Git exercises](https://gitexercises.fracz.com/)

4. [Data structures](https://www.geeksforgeeks.org/data-structures/)
This resource contains a wealth of information on data structures, which is a fundamental concept you'll need to understand when writing code

5. [Fundamentals of Algorithms](https://www.geeksforgeeks.org/fundamentals-of-algorithms/)
If you feel comfortable with the fundamentals of algorithms, take the quiz found in this resource first and then work backwards to identify areas and topics that you need to review. For this resource, you might also want to start with the links under "topics."

### ML tool stack
- [GitHub](http://rogerdudler.github.io/git-guide/)
- [PyTorch](https://pytorch.org/get-started/locally/) 
- [Anaconda + Jupyter Notebook + TensorFlow + Keras](https://medium.com/@margaretmz/anaconda-jupyter-notebook-tensorflow-and-keras-b91f381405f8)
   - [Anaconda documentation](https://docs.anaconda.com)
- Docker 
   - [What is Docker?](https://opensource.com/resources/what-docker)
   - [Install Docker for Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
   - [Install Docker for Mac](https://docs.docker.com/docker-for-mac/install/)
   - [Docker documentation](https://docs.docker.com)

### Data Engineering
[Spark vs Hadoop](https://www.datamation.com/data-center/hadoop-vs.-spark-the-new-age-of-big-data.html)
Each platform has its own ecosystem of tools and modules. This article analyzes the differences between the two platforms and the different use cases to help you determine which platform you’d rather use (or if you’d prefer to use both.) You’ll also read through real-world benchmarks that showcase why Spark has become the dominant platform in the last few years.   

[Scalable Pipelines with Luigi](https://www.youtube.com/embed/Ny2X_WNxrB4?showinfo=0&rel=0&controls=1&autoplay=1)
Please note that there are labs woven throughout this resource that you can code along with. You’ll find the GitHub repo [here](https://github.com/hopelessoptimism/data-engineering-101).

[PySpark in Practice](https://www.youtube.com/embed/ZojIGRS3HLY?showinfo=0&rel=0&controls=1&autoplay=1)
Spark (and its Python interface, PySpark) has become the most commonly used platform for easily working with large datasets in a distributed manner. In this talk and demo from a PyData conference, you’ll observe a case study that involves using PySpark to solve a problem to help you understand the platform’s capabilities.

[Docker for Data Science](https://www.youtube.com/embed/jbb1dbFaovg?showinfo=0&rel=0&controls=1&autoplay=1)
hese models into production. Luckily, working on parts of a system independent of its other parts has been made easier by the containerization of pieces of software functionality. This means that, as an AI or ML engineer, you’ll be able to develop models separate from your company’s overall software development effort and deliver containers that can more easily be plugged into the wider system. In this exercise-packed PyCon tutorial, you’ll be introduced to Docker, the most popular and widely used containerization platform. 

Please note that this demo [includes a code-along](https://github.com/docker-for-data-science/docker-for-data-science-tutorial/tree/master/exercises) spread across 5 hands-on labs.

[AWS Best Practices & Patterns](https://www.youtube.com/embed/a3713oGB6Zk?showinfo=0&rel=0&controls=1&autoplay=1)
Cloud providers, like Microsoft Azure, Google Cloud, and Amazon Web Services (AWS), offer a host of useful services for the AI/ML practitioner, from simple data storage to hosting relational databases, and provide streaming data services, Big Data infrastructure, and even AI products, such as speech-to-text. In this talk, you’ll get an overview of the most important and widely used AWS services.  

### Software Engineering TODO(https://www.springboard.com/workshops/ai-machine-learning-career-track/learn/107/#/curriculum/8104)
Over the years, software engineers have developed tried-and-true practices that are increasingly useful and relevant to other development fields, including AI, ML, and data science. In this subunit, you’ll dive into software engineering best practices in order to incorporate them into your work as an AI/ML engineer. You’ll learn about:

CI/CD (Continuous Integration and Continuous Delivery)

Version control with Git

Logging, testing, and debugging
