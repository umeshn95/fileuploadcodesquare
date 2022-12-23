'use strict';
const SingleFile = require('../models/singlefile');
const MultipleFile = require('../models/multiplefile');
const fs = require('fs')
var parseString = require('xml2js').parseString;
const path = require('path')

const singleFileUpload = async (req, res, next) => {
    try{
       res.status(201).send('File Uploaded Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
}
const multipleFileUpload = async (req, res, next) => {
    try{
        res.status(201).send('Files Uploaded Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const getallSingleFiles = async (req, res, next) => {
    try{
        const fileTypes = req.params.filedescription;
        // const files = await SingleFile.find();
        let currDir
        if(!fileTypes){
          currDir = path.join(__dirname + '/../catalog');
        }
      if(fileTypes=="catalog"){
        currDir = path.join(__dirname + '/../catalog');
      }
      if(fileTypes=="pricebook"){
        currDir = path.join(__dirname + '/../pricebook');
      }
      if(fileTypes=="inventory"){
        currDir = path.join(__dirname + '/../inventory');
      }
      if(fileTypes=="image"){
        return res.status(200).send(files)
      }
        let data = [];
        let dataobject = {};

    fs.readdir(currDir, function(err, filenames) {
      if (err) {
        console.log(err);
        return;
      }
      filenames.forEach(function(filename,index,i) {
        fs.readFile(currDir + '/'+`${filename}`, 'utf-8', function(err, content) {
          if (err) {
            console.log(err)
            onError(err);
            return;
          }


            data.push({filename:filename,file:content})
            if(index==i.length-1){

            res.status(200).send({data:data})
            }
        });
        console.log(data)
      });
    });



    }catch(error) {
        res.status(400).send(error.message);
    }
}




const getallMultipleFiles = async (req, res, next) => {
    try{
        const fileTypes = req.body.filedescription;
        let currDir
      if(fileTypes=="catalog"){
        currDir = path.join(__dirname + '/../catalog');
      }
      if(fileTypes=="pricebook"){
        currDir = path.join(__dirname + '/../pricebook');
      }
      if(fileTypes=="inventory"){
        currDir = path.join(__dirname + '/../inventory');
      }
      if(fileTypes=="image"){
        return res.status(200).send(files)
      }
        let data = [];
        let dataobject = {};

    fs.readdir(currDir, function(err, filenames) {
      if (err) {
        console.log(err);
        return;
      }
      filenames.forEach(function(filename,index,i) {
        fs.readFile(currDir + '\\'+`${filename}`, 'utf-8', function(err, content) {
          if (err) {
            console.log(err)
            onError(err);
            return;
          }

          dataobject[filename] = content

            data.push(dataobject)
            if(index==i.length-1){

            res.status(200).send({data:data})
            }
        });
        console.log(data)
      });
    });

    }catch(error) {
        res.status(400).send(error.message);
    }
}


const deleteFile = async(req,res,next)=>{

res.status(200).send({sucess:true,message:"deleted"})
}


const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

module.exports = {
    singleFileUpload,
    multipleFileUpload,
    getallSingleFiles,
    getallMultipleFiles,
    deleteFile
}