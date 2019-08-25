By the time you’re done with this program, you’ll be:

- Adept at data wrangling and machine learning at scale
- A pro at working with machine learning and neural networks
- A master at leveraging data science and ML engineering to create and deploy a complete AI system to production.

## Month 1: Machine Learning Foundation

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

### ML libraries
[Popular ML Libraries]([https://talkpython.fm/episodes/show/131/top-10-machine-learning-libraries])

There are a variety of Python libraries used within the world of machine learning — and those libraries increase in number if you include libraries associated with AI and deep learning. In this episode of the popular podcast “Talk Python to Me,” Pete Garcin, Machine Learning Expert and Developer Advocate, teaches you about the 10 most popular libraries and provides a broad overview of other libraries so that you know which ones to use when working on real-world projects.

[Intro to scikit-learn](https://www.youtube.com/embed/WCEXYvv-T5Q?showinfo=0&rel=0&controls=1&autoplay=1)
scikit-learn is Python's most popular and comprehensive library for "traditional" machine learning. 

[PyTorch](https://twimlai.com/twiml-talk-70-pytorch-fast-differentiable-dynamic-graphs-python-soumith-chintala/)
[Visual reference](https://pytorch.org/features)
PyTorch is Facebook's library for the fast prototyping of deep learning and AI models. Supporters say that its ease of use gives it a competitive advantage when compared to Google’s TensorFlow library, as PyTorch features the same strengths and capabilities. In this interview, you’ll learn about the major features of the library.

[NLP toolset](https://talkpython.fm/episodes/show/90/data-wrangling-with-python)
Natural Language Processing (which is referred to as NLP and sometimes called text mining or text analytics) is one of the most advanced specializations in machine learning and is a platform for ongoing cutting-edge research in AI. It has brought us things like speech-to-text, machine translation, and chatbots. While listening to this podcast, you’ll get an overview of  libraries, which can help you complete tasks, such as collecting text data to clean and building advanced NLP models.

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
   
### Foundations of ML
In this unit, you’ll begin to hone your ML skills by working with popular ML models like linear and logistic regression and advanced algorithms like Decision Tree and Random Forests. To help you focus on features that are most useful to an ML model and prevent “the Curse of Dimensionality,” you’ll also gain an understanding of cross-validations to assess the best ML model for your work and identify the implications of ML model interpretability and reliability.

Throughout this unit, you’ll also work on a few mini-projects and a case study; while working on these assignments, you’ll practice problem-solving with different ML algorithms, managing large datasets, and optimizing ML pipelines.

[Linear Regression Models](https://www.youtube.com/embed/fd6kQQEbq2Q?showinfo=0&rel=0&controls=1&autoplay=1)
Linear regression is quite possibly the most widely used ML model and is considered a mandatory part of any ML textbook or course. You’ll take a look at linear regression from an ML standpoint and gain an understanding of how this model is used differently in traditional statistics courses

[Logistic Regression](https://www.youtube.com/embed/sp_AFEcf3gk?showinfo=0&rel=0&controls=1&autoplay=1)
Logistic regression is a powerful algorithm that's usually one of the first algorithms to be implemented in both ML libraries and real-world projects. This talk from PyData DC dives into the logistic regression apparatus. 

[Logistic Regression & Gradient Descent](https://www.youtube.com/embed/QGOda9mz_yA?showinfo=0&rel=0&controls=1&autoplay=1)
This resource is especially appealing to those with an interest in math. 

[The two cultures](http://www2.math.uu.se/~thulin/mm/breiman.pdf)
While linear and logistic regression are both taught in statistical and ML courses, the way they are taught — and the purpose for these topics being covered — is fundamentally different. This seminal paper by Professor Leo Breiman, author of the Random Forests algorithm (which you’ll learn about soon,) explains the difference between the two schools of thought.

### Bayesian Statistics & Probabilistic Programming
Probabilistic programming is one of the fastest emerging areas in data science and AI, allowing engineers and data scientists to incorporate domain expertise and build more interpretable models for complex datasets.
[Probablistic Programming Primer](https://product.peadarcoyle.com/)
you’ll approach this topic through practical, hands-on programming exercises and mini-projects using the PyMC3 library. You’ll also learn to perform Bayesian A/B testing (which is what many companies now use) and see how probabilistic programming is related to deep learning and other AI concepts.
[Bayesian Statistics Explained](https://www.analyticsvidhya.com/blog/2016/06/bayesian-statistics-beginners-simple-english/)
Bayesian statistics is one of those subjects that tends to remain elusive, even to the most knowledgeable of statisticians. This article, from Analytics Vidhya, explores this challenging topic and works to demystify it.

### Hands-on Projects

1. [Linear Regression Boston House Project](https://www.kaggle.com/fauzantaufik/boston-housepredict)
The Boston Housing data set contains information about the housing values in suburbs of Boston. This data was originally a part of UCI Machine Learning Repository and has been removed now. We can also access this data from the scikit-learn library. There are 506 samples and 13 feature variables in this dataset. The objective is to predict the value of prices of the house using the given features.
[Example Notebook1](https://towardsdatascience.com/linear-regression-on-boston-housing-dataset-f409b7e4a155)
[Example Notebook2](https://medium.com/@haydar_ai/learning-data-science-day-9-linear-regression-on-boston-housing-dataset-cd62a80775ef)

2. [Logistic Regression Heart Disease Prediction'](https://www.kaggle.com/ronitf/heart-disease-uci)
This database contains 76 attributes, but all published experiments refer to using a subset of 14 of them. In particular, the Cleveland database is the only one that has been used by ML researchers to this date.
[Example Notebook1](https://towardsdatascience.com/predicting-presence-of-heart-diseases-using-machine-learning-36f00f3edb2c)
[Example Notebook2](https://www.kaggle.com/neisha/heart-disease-prediction-using-logistic-regression)

3. [Clustering Techniques Customer Segmentation](http://blog.yhat.com/posts/customer-segmentation-using-python.html)
The dataset contains wine offers that were e-mailed to the customers and data on which offers they purchased. Important features of wine offers include wine varietal, the minimum quantity, discount, country of origin and whether or not it is past peak. In this project, You will practice the use of K-Means and other clustering techniques to help with some of the exploratory aspects of customer segmentation.

4. [Text Classficiation with Naive Bayes](https://github.com/cs109/2015lab10)
In the mini-project, you'll learn the basics of text analysis using a subset of movie reviews from the rotten tomatoes database. You'll also use a fundamental technique in Bayesian inference, called Naive Bayes. 


## Month2 Advanced Machine Learning & Deep Learning


### Advanced ML
[Decision Trees for Classification & Regression](https://www.youtube.com/embed/GZuweldJWrM?showinfo=0&rel=0&controls=1&autoplay=1) 

[Random Forest](https://www.youtube.com/embed/3kYujfDgmNk?showinfo=0&rel=0&controls=1&autoplay=1)

[Random Forests: Applications](https://www.youtube.com/embed/zFGPjRPwyFw?showinfo=0&rel=0&controls=1&autoplay=1)

[Gradient Boosting & XGBoost](https://www.youtube.com/embed/fz1H03ZKvLM?showinfo=0&rel=0&controls=1&autoplay=1)

[XGBoost in Practice](https://www.youtube.com/embed/s3VmuVPfu0s?showinfo=0&rel=0&controls=1&autoplay=1)

[CatBoost: the New Generation of Gradient Boosting](https://www.youtube.com/embed/8o0e-r0B5xQ?showinfo=0&rel=0&controls=1&autoplay=1)

[Practical Guide to Dimensionality Reduction Techniques](https://www.youtube.com/embed/ioXKxulmwVQ?showinfo=0&rel=0&controls=1&autoplay=1)


[Feature Selection: Regularization](https://www.youtube.com/embed/d6XDOS4btck?showinfo=0&rel=0&controls=1&autoplay=1)

[The Curse of Dimensionality](https://www.visiondummy.com/2014/04/curse-dimensionality-affect-classification/)

[ Model Selection Through Cross-Validation](https://www.youtube.com/embed/o7zzaKd0Lkk?showinfo=0&rel=0&controls=1&autoplay=1)

[Accuracy Metrics for Performance Evaluation](https://www.youtube.com/embed/xMyAL0C6cPY?showinfo=0&rel=0&controls=1&autoplay=1) 


### Auto ML
More to come, placeholder 
### Deep Learning
NLP:
   RNN/LSTM/Word Embedding/ Transfomer
CV:
   CNN/ Image Detection/ Segmenation/ 


More to come 
### Projects
1 NLP, 1 CV, 1 advanced ML projects
Placeholder



## Month3 Scaling and Deployment

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

### Software Engineering 
More to come, Placeholder
Over the years, software engineers have developed tried-and-true practices that are increasingly useful and relevant to other development fields, including AI, ML, and data science. In this subunit, you’ll dive into software engineering best practices in order to incorporate them into your work as an AI/ML engineer. You’ll learn about:

CI/CD (Continuous Integration and Continuous Delivery)

Version control with Git

Logging, testing, and debugging

### Writing Faster Code 
More to come
Writing Faster Code
This subunit will cover the following topics:

Ensuring that your code works on large datasets
Reviewing profiling data for code performance
Optimizing numerical code in Python

### Projects:
API, K8S/Docker deploy on ECS/EC2/EKS related
Placeholder
