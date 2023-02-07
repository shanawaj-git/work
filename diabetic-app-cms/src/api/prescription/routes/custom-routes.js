const CONTEXT_PATH_PRESCRIPTION_UPLOAD = '/prescriptions/upload';

module.exports = {
    routes: [{
        method: 'POST',
        path: CONTEXT_PATH_PRESCRIPTION_UPLOAD,
        handler: 'prescription.upload',
        config: {
            policies: [],
        }
    }],
}