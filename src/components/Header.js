import { Component } from "react";
import styled from "styled-components";

const Head = styled.header`
    height: 130px;
    background-color: #CDCDCD;
`;

const Logo = styled.button`
    background-image: url(https://www.hyundai.com/static/images/logo_black.png);
    width: 150px;
    height: 20px;
    background-position: 50%;
    background-size: cover;
    position: relative;
    background-color: transparent;
    border: 0;
    margin: 30px 20px 0 40px;
`;

class Header extends Component{
    render() {
        return (
            <Head>
                <a href='/'>
                    <Logo type="button" name="hyundai"/>
                </a>
            </Head>
        )
    }
}

export default Header;