import React from 'react';
import { Link } from 'react-router-dom';

function SongList() {
    return (
        <>
            <div className="container  mx-auto mt-lg-5 pt-lg-5 p-3" id='mt_5'>
                <div className="row align-items-center justify-content-between">

                    <div className="col-lg-2 col-md-3 col-sm-4 col-7">
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">42 Items</span>
                            </div>
                            <select name="" className="form-control form-control-sm">
                                <option value="">12</option>
                                <option value="">24</option>
                                <option value="">48</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-3 col-5 text-right order-md-1">
                        <a href="#" className="btn btn-primary grid-view btn-sm">
                            <i className="fa fa-th-large"></i>
                        </a>
                    &ensp;
                    <a href="#" className="btn btn-primary list-view btn-sm">
                            <i className="fa fa-bars"></i>
                        </a>
                    </div>

                    <div className="col-md-3 order-md-0 mt-2 mt-md-0">
                        <select className="form-control form-control-sm">
                            <option value="">Sort By</option>
                            <option value="">Artist</option>
                            <option value="">Usage</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <div className="card h-100">
                                    <div className="d-flex justify-content-between position-absolute w-100">
                                        <div className="label-new">
                                            <span className="text-white bg-success small d-flex align-items-center px-2 py-1">
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <span className="ml-1">New</span>
                                            </span>
                                        </div>
                                        <div className="label-sale">
                                            <span className="text-white bg-primary small d-flex align-items-center px-2 py-1">
                                                <Link to="/song/1/" className="text-secondary lead" data-toggle="tooltip" data-placement="left" title="Compare">
                                                    <i className="text-white fa fa-line-chart" aria-hidden="true"></i>
                                                </Link>
                                            </span>
                                        </div>
                                    </div>
                                    <a href="#">
                                        <img src="https://picsum.photos/700/550"
                                            className="card-img-top rounded"
                                            alt="Product" />
                                    </a>

                                    <div className="card-body px-2 pb-2 pt-1">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <p className="h5 text-dark">Song title</p>
                                            </div>
                                            <div>
                                                by abcd
                                            </div>
                                        </div>
                                        <p className="text-warning align-items-center mb-2 text-center">
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                        </p>
                                        <p className="mb-0">
                                            <span>
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                                Eum fuga soluta sunt eveniet voluptatum esse? Voluptatum,
                                                corrupti eveniet? Blanditiis laudantium ratione eius?
                                            </span>
                                        </p>

                                        <div className="d-flex mb-3 justify-content-between">

                                        </div>
                                        <div className="justify-content-between">
                                            <div className="col px-0 d-grid gap-2">
                                                <Link className="btn btn-outline-primary btn-block">
                                                    play <i className="fa fa-play" aria-hidden="true"></i>
                                                </Link>
                                            </div>
                                            <div>

                                            </div>
                                            {/* <div className="ml-2">
                                                <a href="#" className="btn btn-outline-success" data-toggle="tooltip" data-placement="left" title="Add to Wishlist">
                                                    <i className="fa fa-heart" aria-hidden="true"></i>
                                                </a>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="card col-md-4" style={{ width: '18rem' }}>
                                <img src="https://images.pexels.com/photos/5541683/pexels-photo-5541683.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div> */}
                            {/* <div className="col-md-4">
                                <div className="">
                                    <img src="https://images.pexels.com/photos/5541683/pexels-photo-5541683.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                        alt=""
                                        height='300'
                                        width='320'
                                        className='mx-auto rounded'
                                    />
                                    <figcaption>Artist</figcaption>
                                    <span>usage (10)</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SongList;
