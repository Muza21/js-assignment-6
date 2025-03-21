// H/A #6

// Create a DataHandler class.

// Required methods: 
// fetchPosts() - fetches the data and stores it internally. Returns a promise to let the consumer code know the operation is done. (Data - https://jsonplaceholder.typicode.com/posts)
// listPosts() - returns the whole set of posts sorted alphabetically by titles
// getPost(id) - returns the post object with given id
// clearPosts() - deletes all the stored posts

// Optionally: use Map for storing the posts.

class DataHandler {
    #posts = new Map();

    async fetchPosts(){
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/posts')
            const data = await response.json();
            data.forEach(post=>this.#posts.set(post.id,post));
            return this.#posts;
        }catch(err){
            throw err;
        }
    }

    listPosts(){
        return [...this.#posts.values()].sort((a,b)=>a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
    }
    
    getPost(id){
        if(!this.#posts.has(id)){
            return null;
        }
        return this.#posts.get(id);
    }
    
    clearPosts(){
        this.#posts.clear();
    }
}
(async () =>{
const data = new DataHandler();
await data.fetchPosts();
console.log(data.listPosts());
console.log(data.getPost(58));
data.clearPosts()
console.log(data.listPosts());
})()