var moongose = require('moongose');
var Schema = moongose.Schema;
var personSchema = new moongose.Schema({ ID: Schema.Types.ObjectId
                                  , Guid:       { type: 'String',   required:true, trim: true,  default: '' }
                                  , FullName:   { type: 'String',   required:true, trim: true,  default: 'Default Name' }
                                  , Age:        { type: 'Number',   required:true, min: 18,     max: 99, default: 18 }
                                  , Birthday:   { type: 'Date',     required:true, default: Date.now } 
                                  , Email:      { type: 'String',   required:true, unique: true } 
                                  , Gender:     { type: 'Boolean',  required:true, default: true } // true for Male | False for Women
                                  , Skills:     { type: 'Array',    default: [] }
                                 });

// ref key is for reference to another Schema, this will add the information of the schema in this,
// so we will have the relation & have all the information of the another row Schema in the our schema
// this happen using the 'column' as Schema.ObjectId
/* Embedded sub-docuement */
/*

    detail: {
        modelNumber:Number
        hardcover: Boolean,
        reviews: Number,
        rank: Number
    }
*/
mpdule.exports = moongose.model('Person', personSchema);