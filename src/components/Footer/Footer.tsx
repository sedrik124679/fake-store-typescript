import { Container, Row, Col } from "react-bootstrap";
import {FC} from "react";

const Footer: FC = () => {
    return (
        <footer style={{backgroundColor: '#212529', padding: '10px'}}>
            <Container>
                <Row>
                    <Col sm={6} className="text-center text-sm-left">
                        <span style={{color: 'white'}}>&copy; 2023 Eugene Krabs. All Rights Reserved.</span>
                    </Col>
                    <Col sm={6} className="text-center text-sm-right">
                        <span style={{color: 'white'}}>Developed by Eugene Krabs</span>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
