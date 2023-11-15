<h1 align="center">Git  - Remote Repository´s</h1>

<h1 align="center">

<img src="https://github.com/images/modules/site/enterprise/2023/hero-visual.png" width="500">

</h1>

# GIT - Branches

### **GITHUB - Branch Creation - via CLI**

* Open master (Main remote repo) on your local repository

<br>

1.  Create the branch on the CLI:

````bash
git branch <name of the branch>
````

2. To see all the branches created:

````bash
git branch -a
````

3. To switch to any of the branches created:

````bash
git checkout <name of the branch>
````

4. Make the required modifications to the branch and save it (<CTRL + S>)

6. To see all the files modified created in the selected branch:

````bash
git status
````

6. (Update for submission to Git of all saved changes to the siles in the local repository).

````bash
git add .
````

7. (Freezes the status of the files in the local repository prior to submission to Gihub).

````bash
git commit -m "<info about the changes>"
````

<br>

### **GITHUB - Branch Deletion - via CLI**

1. Switch to the master branch again:

````bash
git checkout <master>
````

2. To delete the branch

````bash
git checkout -d <name of the branch>
````

<br>

### **GitHub - Branch Merges via CLI**

1. (You first need to be inside of the branch you want to merge into)

````bash
git checkout <master / or any other branch>
````

2. Merge of the branch you want, with the once currently selected and to be merged with.

````bash
git merge <name of the branch to be merged>
````

<br>
<hr>
<br>

# GIT - Pull Request (Branch to Master)

### **VSCode - Pull Request Creation - via CLI**

1. **Ensure Your Local Repository is Up to Date**:
   - Make sure your local repository is up to date.
   - Run these commands:

   ```bash
   git checkout master
   git pull origin master
   git checkout your-feature-branch
   git merge master
   ```

2. **Push Your Branch**:

   - Push your branch to the remote repository:

   ```bash
   git push origin your-feature-branch
   ```

### **GitHub - Branch Merges via Github**

1. **Create Pull Request on GitHub**:

   - Go to your repository on GitHub.
   - Click "Pull Requests."
   - Click "New Pull Request."
   - Select the base (usually "master") and compare (your branch) branches.
   - Add a title, description, and create the pull request.

### **GitHub - Code Quality Maintenance and Assurance**

1. **Review, Approve, and Merge**:

   - Review changes.
   - Request reviews if needed.
   - Resolve feedback.
   - Merge the pull request.

<br>
<hr>
<br>
<p align="center">&lt;&lt;&lt;&copy;<a href="https://github.com/joaoatrocha" target="blank">Joao Rocha</a>&gt;&gt;&gt;</p>