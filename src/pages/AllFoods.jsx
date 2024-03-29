import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col, ListGroupItem, ListGroup } from "reactstrap";
import products from "../assets/fake-data/products";
import ProductCard from "../components/UI/product-card/ProductCard";
import "../styles/all-foods.css";
import ReactPaginate from "react-paginate";
import "../styles/pagination.css";
const AllFoods = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const[productData,setProductData]=useState(products)
  const [pageNumber, setPageNumber] = useState(0);

  const productPerPage = 8;
  const pagesVisited = pageNumber * productPerPage;

  const searchhedProduct = products.filter((item) => {
    if (searchTerm.value === "") return item;
    if (item.title.toLowerCase().includes(searchTerm.toLowerCase()))
      return item;
  });
  const displayPage = searchhedProduct.slice(
    pagesVisited,
    pagesVisited + productPerPage
  );

  const pageCount = Math.ceil(searchhedProduct.length / productPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Helmet title="All">
      <CommonSection title="All Foods" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6" xs='12'>
              <div className="search__widget d-flex align-items-center justify-content-between ">
                <input
                  type="text"
                  placeholder="I`m Looking For..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6" xs='12'className="mb-5">
              <div className="sorting__widget text-end">
                <select className="w-50 ">
                  <option>Default</option>
                  <option value="ascending">Alphabetically,A-Z</option>
                  <option value="descending">Alphabetically,Z-A</option>
                  <option value="high-price">High Price</option>
                  <option value="low-price">Low Price</option>
                </select>
              </div>
            </Col>
            {displayPage.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                {" "}
                <ProductCard item={item} />
              </Col>
            ))}

            <div>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBtn"}
                nextLinkClassName={"nextBtn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AllFoods;
