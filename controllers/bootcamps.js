const Bootcamps = require('../models/Bootcamps');
const ErrorResponse = require('../utils/errorResponse');
//@desc Get All bootcamps
//@router GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamps.find();

        res.status(200).json({success : true , count: bootcamps.length ,data : bootcamps});
    }catch(err)
    {
        res.status(400).json({success : false });
        console.log(err);
    }
}

//@desc Get single bootcamp
//@router GET /api/v1/:id
//@access Public
exports.getBootcamp = async (req, res, next) => {
    try{
        const bootcamp = await Bootcamps.findById(req.params.id);
        if(!bootcamp)
        {
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404));
        }else {
            return res.status(200).json({success: true,data : bootcamp});
        }

    }catch(err)
    {
        next(err);
        //next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404));
        // res.status(404).json({success : false});
    }
}

//@desc POST Create bootcamp
//@router POST /api/v1/:id
//@access Private
exports.createBootcamp = async(req, res, next) => {
    console.log(typeof req.body);
    console.log(JSON.stringify(req.body));
    try
    {
        console.log(req.body);
        const bootcamp = await Bootcamps.create(req.body);
        res.status(201).json({success: true, data: bootcamp});
    }
    catch(err)
    {
        console.log.log(err);
        res.status(400).json({success: false , data : null});
    }

}

//@desc PUT Update bootcamp
//@router PUT /api/v1/:id
//@access Private
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamps.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        if(!bootcamp)
        {
            return res.status(400).json({success : false});
        }else {
            return res.status(200).json({success : true,data : bootcamp});
        }
    }catch(err)
    {
        return res.status(400).json({success : false});
        console.log(err);
    }
}

//@desc DELETE  bootcamp
//@router DELETE /api/v1/:id
//@access Private
exports.deleteBootcamp = async (req, res, next) => {
    try{
        const bootcamp = await Bootcamps.findByIdAndDelete(req.params.id);
        if(!bootcamp)
        {
            return  res.status(400).json({success : false});
        }else {
            return res.status(200).json({success : true ,data : {}})
        }
    }catch(err)
    {
        return  res.status(400).json({success : false});
    }

}