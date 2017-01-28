

//View Reference
/*
db.createView('vw_reference', "wb_reference",
    [
        {$lookup: {
            from: "wb_referenceType",
            localField: "referenceTypeId",
            foreignField: "_id",
            as: "referenceTypeDoc"
        }
        },
        {$unwind: "$referenceTypeDoc"}
    ])*/
