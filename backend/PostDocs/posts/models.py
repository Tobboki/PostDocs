from django.db import models
class Post(models.Model):
    
    title=models.CharField(max_length=100)
    content=models.TextField(max_length=100000)
    data=models.DateField(auto_now_add=True)
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='posts') 
   
    def __str__(self):
        return self.title
    
class User(models.Model):
    
    firstname=models.CharField(max_length=100)
    lastname=models.CharField(max_length=100)
    email=models.EmailField(unique=True)
    

    def __str__(self):
        return f"{self.firstname} {self.lastname}"
    
class comment(models.Model):
    
   
    content=models.TextField(max_length=100000)
    
    data=models.DateField(auto_now_add=True)
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='comments')
     
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    def __str__(self):
       return f"Comment by {self.user.firstname} on {self.post.title}"