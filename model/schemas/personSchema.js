
var personSchema = new moongose.Schema({ ID: Schema.Types.ObjectId
                                  , Guid:       { type: 'String', trim: true, default: '' }
                                  , FullName:   { type: 'String', trim: true, default: 'Default Name' }
                                  , Age:        { type: 'Number', min: 18, max: 99, default: 18 }
                                  , Birthday:   { type: 'Date', default: Date.now } 
                                  , Gender:     { type: 'Boolean', default: true } // true for Male | False for Women
                                 });


mpdule.exports = moongose.model('Person', personSchema);