class APIFeature {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }
  search() {
    let keywords = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};
    //   console.log(this.query);
      this.query.find({...keywords})
      return this;
  }
  filter(){
    const queryCopy ={...this.querystr}
    // console.log(queryCopy);
    const removeFields=['keyword','limit','page'];
    removeFields.forEach(field=>delete queryCopy[field])


    let querystr=JSON.stringify(queryCopy)
    querystr=querystr.replace(/\b(lt|tle|gt|gte)/g,match=> `$${match}`)
    
    this.query.find(JSON.parse(querystr))
    return this;
  }
  paginate(resPerPage){
    const cuurentPage=this.querystr.page||1;
    const skip=resPerPage*(cuurentPage-1);
    this.query.limit(resPerPage).skip(skip);
    return this;
  }

}

module.exports=APIFeature;


