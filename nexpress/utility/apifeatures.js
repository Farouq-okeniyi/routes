class apiFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    //filter constructor

    filter(){
        let queryString = JSON.stringify(this.queryStr);

        queryString = queryString.replace(/\b(gte| gt|lte|lt)/g, (match)=> `$${match}`)

        const queryObj = JSON.parse(queryString);
      
        this.query =  this.query.find(queryObj);

        return this;
    }

    //sort constructor
    sort(){
     
        
            if (this.queryStr.sort) {
                // Split the sort parameters by commas and join them with spaces
                const sortBy = this.queryStr.sort.split(',').join(' ');
        
                console.log('Sorting by:', sortBy);
        
                // Apply the sort to the query
                this.query = this.query.sort(sortBy);
            } else {
                // Default sort by 'ReleaseYear'
                this.query = this.query.sort('ReleaseYear');
            }
        
            return this;  // Return 'this' to allow method chaining
        
    }

    //paginate method
    paginate(){
        const page = this.queryStr.page*1 || 1;
        const limit = this.queryStr.limit*1 || 10;

            const skip = (page-1)*limit
            
            this.query = this.query.skip(skip).limit(limit)

        // if(this.queryStr.page){
        //     const moviecount = await this.query.countDocuments()

        //     if(skip >= moviecount){
        //         throw new error('This page not found')
        //     }
        // }

        return this

    }
}

module.exports = apiFeatures



// let queryjsonstring = JSON.stringify(this.queryStr);
// let queryparsestring = JSON.parse(this.queryStr);
// // // let movies = await Moviee.find(queryObj);
// // let query =  Moviee.find(queryObj);
// // const movies = await 