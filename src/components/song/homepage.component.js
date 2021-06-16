import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import CreateSong from './createsong.component';
import SongList from './songlist.component';


function HomePage() {
    return (
        <div className="mt-5 pt-2">
            <div className="row">
                <div className="col-md-6">

                    <Carousel
                        fade
                        nextLabel={""}
                        prevLabel={""}
                    >
                        <Carousel.Item interval={5000}>
                            <img
                                className="d-block w-100"
                                src="https://images.pexels.com/photos/363905/pexels-photo-363905.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                alt="First slide"
                                // height='550'
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://images.pexels.com/photos/417451/pexels-photo-417451.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                alt="Second slide"
                                // height='550'
                            />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://images.pexels.com/photos/1539789/pexels-photo-1539789.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                alt="Third slide"
                                // height='550'
                            />
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="col-md-6 p-0">
                    <CreateSong  size={10} pad={2}/>
                </div>

               
                <div className="col-md-12">
                <hr />
                    <SongList/>
                </div>
            </div>

        </div>
    )
}

export default HomePage;
