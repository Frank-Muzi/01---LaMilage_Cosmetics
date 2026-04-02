import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image_url || product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>R{product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;