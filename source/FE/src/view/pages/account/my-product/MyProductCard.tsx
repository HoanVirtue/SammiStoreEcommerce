import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

// Define the type for the liked product data
export type TMyLikedProduct = {
  customerId: number;
  productId: number;
  productName: string | null;
  productImage: string | null;
  price: number | null;
  newPrice: number | null;
  stockQuantity: number | null;
  id: number;
  createdDate: string;
  updatedDate: string | null;
  createdBy: string;
  updatedBy: string | null;
  isActive: boolean;
  isDeleted: boolean;
  displayOrder: number | null;
};

interface MyProductCardProps {
  item: TMyLikedProduct;
}

const MyProductCard: React.FC<MyProductCardProps> = ({ item }) => {
  // TODO: Fetch full product details using item.productId if needed
  //       to display name, image, price, etc.

  return (
    <Card sx={{ /* Add styling as needed */ }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Product ID: {item.productId}
        </Typography>

        {/* Placeholder for Product Image */}
        <Box sx={{
          height: 140,
          backgroundColor: '#f0f0f0',
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 1
        }}>
          <Typography variant="caption" color="text.secondary">Image Placeholder</Typography>
        </Box>

        {/* Placeholder for Product Name */}
        {item.productName ? (
             <Typography variant="body1" component="div">
               {item.productName}
             </Typography>
        ) : (
             <Typography variant="body1" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
               (Name not available)
             </Typography>
        )}

         {/* Placeholder for Price */}
         {item.price !== null ? (
             <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold', mt: 1 }}>
               ${item.price.toFixed(2)}
             </Typography>
         ) : (
            <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary', mt: 1 }}>
                (Price not available)
            </Typography>
         )}

         {/* Add more details if needed, potentially after fetching full product info */}

      </CardContent>
       {/* Example: Add CardActions for an "unlike" button */}
       {/*
       <CardActions>
         <Button size="small">Remove from Liked</Button>
       </CardActions>
       */}
    </Card>
  );
};

export default MyProductCard;
