import { Typography, Button, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Listing } from '../types';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { addToCart, deleteFromCart } from '../utils/cartUtils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { getCategoryNameById } from '../utils/categoryUtils';

const ProductPage = () => {
  const [product, setProduct] = useState<Listing | null>(null);
  const [error, setError] = useState<string>('');
  const [added, setAdded] = useState<boolean>(false);
  const userId = useSelector((state: RootState) => state.user.user?.user_id);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getProductListing?listingId=${id}`)
      .then((res) => {
        if (res.data.listing) {
          setProduct(res.data.listing);
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        setError('Error loading product details.');
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/checkCart?userId=${
          userId ?? location.state.userId
        }&productId=${id}`,
      )
      .then((res) => {
        setAdded(res.data.exists);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cart]);

  const handleCartButtonClick = () => {
    if (added) {
      deleteFromCart(
        Number(id),
        userId! ?? location.state.userId,
        setAdded,
        dispatch,
      );
    } else {
      addToCart(
        Number(id),
        userId! ?? location.state.userId,
        1,
        setAdded,
        dispatch,
      );
    }
  };

  return (
    <div>
      {product ? (
        <>
          <img
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
          />
          <Box sx={{ gap: 4 }}>
            <Typography variant='h5'>{product.title}</Typography>
            <Typography variant='subtitle1'>Price: ${product.price}</Typography>
            {/* Add category name, assuming you have a way to map category IDs to names */}
            <Typography variant='subtitle1'>
              Category: {getCategoryNameById(product.category_id)}
            </Typography>
            <Typography variant='body1'>{product.description}</Typography>
            <Button
              size='small'
              variant='contained'
              color={added ? 'error' : 'primary'}
              onClick={handleCartButtonClick}
            >
              {added ? 'Delete From Cart' : 'Add to Cart'}
            </Button>
          </Box>
        </>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default ProductPage;
