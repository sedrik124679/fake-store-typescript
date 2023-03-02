import {FC, useState} from "react";
import { FaStar } from "react-icons/fa";
import { Col, Row } from "react-bootstrap";

interface RatingProps {
    rating: number;
    numReviews: number;
}

const ProductRating: FC<RatingProps> = ({ rating, numReviews }) => {
    const [hover, setHover] = useState(0);

    return (
        <Row className="align-items-center">
            <Col xs="auto">
                {[...Array(5)].map((_, i) => {
                    const ratingValue = i + 1;
                    return (
                        <label key={i}>
                            <input type="radio" name="rating" value={ratingValue} style={{ display: "none" }} />
                            <FaStar
                                size={20}
                                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(rating)}
                            />
                        </label>
                    );
                })}
            </Col>
            <Col>
                <span>{numReviews} reviews</span>
            </Col>
        </Row>
    );
};

export default ProductRating;
