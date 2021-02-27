var AWS = require('aws-sdk');
var s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
});

module.exports = (app) => {
    app.post("/api/assets/upload", (req, res) => {
        console.log("UPLOADBODY", req)
        var params = {
            Key: 'hello',
            Bucket: "dogslistproject2",
            Body: "hello"
        };
        s3.putObject(params, function put(err, data) {
            if (err) {
                console.log("PUT ERROR", err, err.stack);
                return;
            } else {
                console.log("PUTSUCESS", data);
            }
            delete params.Body;
            s3.getObject(params, function put(err, data) {
                if (err) console.log("GETERROR", err, err.stack);
                else console.log("GETSUCESS", data);
                console.log("GETBODY", data.Body.toString());
            });
        });
    })
}