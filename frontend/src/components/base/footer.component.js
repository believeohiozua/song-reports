import React from 'react'

function Footer() {
    return (
        <footer className="footer-section bg-dark text-white mt-5">
            <div className="container">
                <div className="footer-cta pt-5 pb-5">
                    <div className="row">

                        <div className="col-md-4 mb-50">
                            <div className="footer-widget">
                                {/* <div className="footer-logo">
                                    <a href="index.html"><img src="https://i.ibb.co/QDy827D/ak-logo.png" className="img-fluid" alt="logo" /></a>
                                </div> */}
                                <h1 className='h2'>Song Report</h1>
                                <div className="footer-text">
                                    <p>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing
                                elit,Lorem ipsum dolor sit amet.</p>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="single-cta">
                                        <i className="h3 fa fa-map-marker"></i>
                                        <div className="cta-text">
                                            <h4>Find us</h4>
                                            <span>35, Irogama Street, Edo, Nigeria</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="single-cta">
                                        <i className="h3 fa fa-phone"></i>
                                        <div className="cta-text">
                                            <h4>Call us</h4>
                                            <span>+234 703 5834 838</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="single-cta">
                                        <i className="h3 fa fa-envelope"></i>
                                        <div className="cta-text">
                                            <h4>Mail us</h4>
                                            <span>believe.ohiozua@gmail.com</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="footer-social-icon">
                                        <span>Follow us</span>
                                        <hr />
                                        <span><i className="mx-1 h5 border bg-white rounded-circle px-2 py-1 fa fa-facebook text-dark"></i></span>
                                        <span><i className="mx-1 h5 border bg-white rounded-circle px-2 py-1 fa fa-twitter text-dark"></i></span>
                                        <span><i className="mx-1 h5 border bg-white rounded-circle px-2 py-1 fa fa-whatsapp text-dark"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="copyright-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="copyright-text">
                                <p>Copyright &copy; 2021 | All Right Reserved </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
