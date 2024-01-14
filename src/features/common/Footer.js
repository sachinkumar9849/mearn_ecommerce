import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaFirefoxBrowser } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <section className="footer_new bg-white">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3">
            <div className="col-span-1">
              <div className="footer_logo-block">
              <Link to="/">
                          <img
                            src={`${process.env.PUBLIC_URL}/img/logo.png`}
                            className="logo_nav h-full object-cover rounded-2xl p-2"
                            alt="page img"
                          />
                        </Link>
              </div>
            </div>
            <div className="col-span-1">
              <div className="footer_title-block">
                <div className="">
                  <h4>Address</h4>
                </div>
                <p>Lalitpur ,Imadol , Nepal</p>
                <div className="social_icon pt-2">
                  <ul className="flex mt-3">
                    <li>
                      <a href="" className="facebook_bg" target="_blank">
                      <FaGithub />
                      </a>
                    </li>
                    <li>
                      <a href="" className="twitter_bg" target="_blank">
                      <FaFirefoxBrowser />
                      </a>
                    </li>

                  </ul>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="footer_title-block">
                <div className="">
                  <h4>Contact</h4>
                </div>
                <div className="footer_contact">
                  <a className="text-black" href="mailto:kjhasachin@gmail.com">
                    lalitpurward24@gmail.com
                  </a>
                </div>
                <div className="footer_num mt-3">
                  <a href="tel:9829996395"> 9829996395</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="footer_button">
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 border_top pt-4">
            <div class="col-span-1">
              <div class="footer_ul d-lg-block d-none">
                <ul class="flex">
                  <li>
                    <a href="">About</a>
                  </li>
                  <li>
                    <a href="">Contact</a>
                  </li>
                  <li>
                    <a href=""> Product</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-span-1">
              <div class="footer_button-text text-right">
                <p>Copyright © E-Commerce</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
