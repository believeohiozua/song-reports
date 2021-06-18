let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server/index");

//Assertion Style
chai.should();

// http request
chai.use(chaiHttp);

const sampleSongOne = {
    song: "https://www.youtube.com/watch?v=2oxjenYEplM",
    title: "Gospel in 10 Seconds",
    artist: "Karen Dykes",
    description: "True and beautiful",
    photo: "https://yt3.ggpht.com/ytc/AAUvwnh8sfg5CoodYB7ibS70xa_KdPC9tl__0086M7wUEw=s48-c-k-c0x00ffffff-no-rj",
    email: "info@example.com",
    report: [],
};
const sampleSongTwo = {
    song: "https://www.youtube.com/watch?v=QF08nvtHHCY",
    title: "Corporate Background Music",
    artist: "FreeCopyrightMusic",
    description: "Corporate background music for your videos",
    photo: "https://yt3.ggpht.com/ytc/AAUvwnjXhp2XEQyxqsjA7HOw3UFNHwd4AruZeKxKK9S4=s48-c-k-c0x00ffffff-no-rj4",
    email: "email@example.com",
    report: [],
};

const sampleUsage = {
    id: '',
    udid: '60cb3d8ade29b540428b149e',
    video_length: 90,
    usage: 75,
    percentage_usage: 90,
    date: Date.now()
}
var sample_id;
chai.request(server)
    .post("/api/v1/song/add/")
    .send(sampleSongTwo)


describe('Test Cases', () => {
    /**
     * Fetch all songs
     */
    describe("GET /api/v1/song", () => {
        it("It should GET all songs from the db", (done) => {
            chai.request(server)
                .get("/api/v1/song")
                .end((err, response) => {
                    sample_id = response.body[0]._id
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body[0].should.have.property('song');
                    response.body[0].should.have.property('report');
                    done();
                });
        });

        it("It should GET status 404", (done) => {
            chai.request(server)
                .get("/api/v1/songs")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });


    });


    /**
     * Test the GET song (by id) route
     */
    describe("GET /api/tasks/:id", () => {
        it("It should GET a task by ID", (done) => {
            const get_id = sample_id
            chai.request(server)
                .get("/api/v1/song/" + get_id)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('song');
                    response.body.should.have.property('title');
                    response.body.should.have.property('artist');
                    response.body.should.have.property('_id').eq(get_id);
                    done();
                });
        });

        it("It should fail GET a song by ID", (done) => {
            const get_id = sample_id + 'a';
            chai.request(server)
                .get("/api/v1/song/" + get_id)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

    });


    /**
    * Test the POST route
    */
    describe("POST /api/v1/song/add/", () => {
        it("It should POST a new song", (done) => {
            chai.request(server)
                .post("/api/v1/song/add")
                .send(sampleSongOne)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.request._data.should.have.property('song').eq("https://www.youtube.com/watch?v=2oxjenYEplM");
                    response.request._data.should.have.property('title').eq("Gospel in 10 Seconds");
                    response.request._data.should.have.property('artist').eq("Karen Dykes");
                    done();
                });
        });

        it("It should NOT POST a new task without the name property", (done) => {
            const wongSample = {
                title: 'sending only title'
            };
            chai.request(server)
                .post("/api/v1/song/add/")
                .send(wongSample)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

    });


    /**
         * Test the PUT route
         */
    describe("PUT  /api/v1/song/update/:id", () => {
        it("It should PUT an existing song", (done) => {

            chai.request(server)
                .put("/api/v1/song/update/" + sample_id)
                .send(sampleSongTwo)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.request._data.should.have.property('song').eq("https://www.youtube.com/watch?v=QF08nvtHHCY");
                    response.request._data.should.have.property('title').eq("Corporate Background Music");
                    response.request._data.should.have.property('artist').eq("FreeCopyrightMusic");
                    done();
                });
        });

        it("It should NOT PUT an existing song without a song field", (done) => {

            const sampleIncompleteFeild = {
                title: "Gospel in 10 Seconds",
                artist: "Karen Dykes",
                description: "True and beautiful",
            };
            chai.request(server)
                .put("/api/v1/song/update/" + sample_id)
                .send(sampleIncompleteFeild)
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });
    });


    /**
         * Test the DELETE route
         */
    describe("DELETE  /api/v1/song/:id", () => {
        it("It should DELETE an existing song with given id", (done) => {
            chai.request(server)
                .delete("/api/v1/song/" + sample_id)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
        });

        it("It should NOT DELETE song that is not in the database", (done) => {
            chai.request(server)
                .delete("/api/v1/song/" + sample_id + 'a')
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

    });


});