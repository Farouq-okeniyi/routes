class apiFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }   

    //filter constructor

    filter() {
        // Work with plain query string, avoid MongoDB object stringification
        let queryStrCopy = { ...this.queryStr };
        
        // Replace operators with MongoDB-specific ones
        let queryString = JSON.stringify(queryStrCopy);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        
        const queryObj = JSON.parse(queryString);

        // Apply the filter to the MongoDB query
        this.query = this.query.find(queryObj);

        return this;  // Allow method chaining
    }

    //sort constructor
    sort(){
            if (this.queryStr.sort) {
                const sortBy = this.queryStr.sort.split(',').join(' ');
                // console.log('hello')
                this.query = this.query.sort(sortBy);

            } else {
                this.query = this.query.sort('ReleaseYear');

            }
            // console.log('hello')
            return this;  // Return 'this' to allow method chaining
    }

    //paginate method
    paginate(){
        const page = this.queryStr.page*1 || 1;
        const limit = this.queryStr.limit*1 || 10;

            const skip = (page-1)*limit
            
            this.query = this.query.skip(skip).limit(limit)

            // console.log('paginate')      
            return this;
            
        }
}

module.exports = apiFeatures



// let queryjsonstring = JSON.stringify(this.queryStr);
// let queryparsestring = JSON.parse(this.queryStr);
// // // let movies = await Moviee.find(queryObj);
// // let query =  Moviee.find(queryObj);



// if(this.queryStr.page){
//     const moviecount = await this.query.countDocuments()

//     if(skip >= moviecount){
//         throw new error('This page not found')
//     }
// }
// // const movies = await 