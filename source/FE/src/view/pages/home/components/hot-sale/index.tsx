import { Grid, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CountdownTimer from './CountdownTimer';
import { getAllProducts, getEndowProducts } from 'src/services/product';
import ProductCard from 'src/view/pages/product/components/ProductCard';
import { TProduct } from 'src/types/product';
import NoData from 'src/components/no-data';
import { useTranslation } from 'react-i18next';

const listProduct = [
    {
        id: '2334',
        code: 'fr934',
        name: 'Bộ Tinh Chất First Serum Hoàn Lưu Cao Whoo Hwanyu Imperial Youth First Serum 75ml',
        stockQuantity: 45,
        sold: 20,
        price: 356000,
        discount: 34,
        ingredient: 'Chứa các thành phần quý giá với sức sống mạnh mẽ và hiệu quả cao như Nấm linh chi sừng hươu, nhân sâm hoang dã tự nhiên, xuyên tâm liên, hà thủ ô trường sinh và 70 thành phần thảo dược quý nhóm Quân, Thần, Tá, Sứ được bào chế theo công thức "nguyên tắc phối hợp thảo dược với đông trùng hạ thảo" giúp tối đa hóa hiệu quả của các thành phầnSansam JeonchohwanTM – có chứa các tphan hoạt tính của nhân sâm núi hoang dã quý hiếm từ rễ tới lá mang lại hiệu ứng tươi trẻ và sống động cho làn da.',
        uses: 'Giải phóng lớp da thô ráp và khô cứng để tạo nền da tối ưu, cho phép da tiếp nhận dinh dưỡng ở các sản phẩm sau 1 cách tốt nhất.',
        usageGuide: ' Tinh chất khởi nguồn > Tinh dầu dưỡng da > Kem dưỡng mắt > Kem dưỡng da',
        brandId: 6,
        categoryId: 1,
        status: 1,
        startDate: "2025-03-6T17:00:00",
        endDate: "2025-03-24T17:00:00",
        images: [
            {
                "imageUrl": "https://product.hstatic.net/200000536477/product/372836331_777503777720800_793616417880040259_n_-_copy_13a206a1eb3144bfa2562a3871d7ea7a.jpg",
                "publicId": "uploads/products/product_6_36054bc5-77c9-4c3a-93b0-b10d8b450cd7",
                "typeImage": "Product",
                "id": 28,
                "createdDate": "0001-01-01T00:00:00",
                "updatedDate": null,
                "createdBy": null,
                "updatedBy": null,
                "isActive": false,
                "isDeleted": false,
                "displayOrder": 1
            }
        ]
    },
    {
        id: '233',
        code: 'fr934',
        name: 'Bộ Tinh Chất First Serum Hoàn Lưu Cao Whoo Hwanyu Imperial Youth First Serum 75ml',
        stockQuantity: 45,
        sold: 20,
        price: 356000,
        discount: 34,
        ingredient: 'Chứa các thành phần quý giá với sức sống mạnh mẽ và hiệu quả cao như Nấm linh chi sừng hươu, nhân sâm hoang dã tự nhiên, xuyên tâm liên, hà thủ ô trường sinh và 70 thành phần thảo dược quý nhóm Quân, Thần, Tá, Sứ được bào chế theo công thức "nguyên tắc phối hợp thảo dược với đông trùng hạ thảo" giúp tối đa hóa hiệu quả của các thành phầnSansam JeonchohwanTM – có chứa các tphan hoạt tính của nhân sâm núi hoang dã quý hiếm từ rễ tới lá mang lại hiệu ứng tươi trẻ và sống động cho làn da.',
        uses: 'Giải phóng lớp da thô ráp và khô cứng để tạo nền da tối ưu, cho phép da tiếp nhận dinh dưỡng ở các sản phẩm sau 1 cách tốt nhất.',
        usageGuide: ' Tinh chất khởi nguồn > Tinh dầu dưỡng da > Kem dưỡng mắt > Kem dưỡng da',
        brandId: 6,
        categoryId: 1,
        status: 1,
        startDate: "2025-03-6T17:00:00",
        endDate: "2025-03-24T17:00:00",
        images: [
            {
                "imageUrl": "https://product.hstatic.net/200000536477/product/372836331_777503777720800_793616417880040259_n_-_copy_13a206a1eb3144bfa2562a3871d7ea7a.jpg",
                "publicId": "uploads/products/product_6_36054bc5-77c9-4c3a-93b0-b10d8b450cd7",
                "typeImage": "Product",
                "id": 28,
                "createdDate": "0001-01-01T00:00:00",
                "updatedDate": null,
                "createdBy": null,
                "updatedBy": null,
                "isActive": false,
                "isDeleted": false,
                "displayOrder": 1
            }
        ]
    },
    {
        id: '9999',
        code: 'fr934',
        name: 'Kem Dưỡng Da Tay Whoo Royal Hand Cream SPF10 set',
        stockQuantity: 65,
        sold: 35,
        price: 456000,
        discount: 38,
        ingredient: 'Chứa các thành phần quý giá với sức sống mạnh mẽ và hiệu quả cao như Nấm linh chi sừng hươu, nhân sâm hoang dã tự nhiên, xuyên tâm liên, hà thủ ô trường sinh và 70 thành phần thảo dược quý nhóm Quân, Thần, Tá, Sứ được bào chế theo công thức "nguyên tắc phối hợp thảo dược với đông trùng hạ thảo" giúp tối đa hóa hiệu quả của các thành phầnSansam JeonchohwanTM – có chứa các tphan hoạt tính của nhân sâm núi hoang dã quý hiếm từ rễ tới lá mang lại hiệu ứng tươi trẻ và sống động cho làn da.',
        uses: 'Giải phóng lớp da thô ráp và khô cứng để tạo nền da tối ưu, cho phép da tiếp nhận dinh dưỡng ở các sản phẩm sau 1 cách tốt nhất.',
        usageGuide: ' Tinh chất khởi nguồn > Tinh dầu dưỡng da > Kem dưỡng mắt > Kem dưỡng da',
        brandId: 6,
        categoryId: 1,
        status: 1,
        startDate: "2025-03-8T17:00:00",
        endDate: "2025-03-24T17:00:00",
        images: [
            {
                "imageUrl": "https://product.hstatic.net/200000536477/product/z6224604274419-97517c9cd45da8bff9796e091081a04f_250dd754a6f349ed8a4367eb22d54fc6.jpg",
                "publicId": "uploads/products/product_6_36054bc5-77c9-4c3a-93b0-b10d8b450cd7",
                "typeImage": "Product",
                "id": 28,
                "createdDate": "0001-01-01T00:00:00",
                "updatedDate": null,
                "createdBy": null,
                "updatedBy": null,
                "isActive": false,
                "isDeleted": false,
                "displayOrder": 1
            }
        ]
    },
    {
        id: '238',
        code: 'fr934',
        name: 'Son Lì Hoàng Cung Whoo Velvet Lip Rouge Phiên Bản Đặc Biệt',
        stockQuantity: 77,
        sold: 22,
        price: 1556000,
        discount: 28,
        ingredient: 'Chứa các thành phần quý giá với sức sống mạnh mẽ và hiệu quả cao như Nấm linh chi sừng hươu, nhân sâm hoang dã tự nhiên, xuyên tâm liên, hà thủ ô trường sinh và 70 thành phần thảo dược quý nhóm Quân, Thần, Tá, Sứ được bào chế theo công thức "nguyên tắc phối hợp thảo dược với đông trùng hạ thảo" giúp tối đa hóa hiệu quả của các thành phầnSansam JeonchohwanTM – có chứa các tphan hoạt tính của nhân sâm núi hoang dã quý hiếm từ rễ tới lá mang lại hiệu ứng tươi trẻ và sống động cho làn da.',
        uses: 'Giải phóng lớp da thô ráp và khô cứng để tạo nền da tối ưu, cho phép da tiếp nhận dinh dưỡng ở các sản phẩm sau 1 cách tốt nhất.',
        usageGuide: ' Tinh chất khởi nguồn > Tinh dầu dưỡng da > Kem dưỡng mắt > Kem dưỡng da',
        brandId: 6,
        categoryId: 1,
        status: 1,
        startDate: "2025-03-8T17:00:00",
        endDate: "2025-03-24T17:00:00",
        images: [
            {
                "imageUrl": "https://product.hstatic.net/200000536477/product/7a83bb37240d9853c11c_9528feb2f3ed4a71932738296bd71668.jpg",
                "publicId": "uploads/products/product_6_36054bc5-77c9-4c3a-93b0-b10d8b450cd7",
                "typeImage": "Product",
                "id": 28,
                "createdDate": "0001-01-01T00:00:00",
                "updatedDate": null,
                "createdBy": null,
                "updatedBy": null,
                "isActive": false,
                "isDeleted": false,
                "displayOrder": 1
            }
        ]
    },
    {
        id: '222',
        code: 'fr934',
        name: 'Collagen Dạng Uống Cải Thiện Làn Da SHJW Hanami Collagen Ampoule 28 ống x 25ml',
        stockQuantity: 45,
        sold: 40,
        price: 1556000,
        discount: 20,
        ingredient: 'Chứa các thành phần quý giá với sức sống mạnh mẽ và hiệu quả cao như Nấm linh chi sừng hươu, nhân sâm hoang dã tự nhiên, xuyên tâm liên, hà thủ ô trường sinh và 70 thành phần thảo dược quý nhóm Quân, Thần, Tá, Sứ được bào chế theo công thức "nguyên tắc phối hợp thảo dược với đông trùng hạ thảo" giúp tối đa hóa hiệu quả của các thành phầnSansam JeonchohwanTM – có chứa các tphan hoạt tính của nhân sâm núi hoang dã quý hiếm từ rễ tới lá mang lại hiệu ứng tươi trẻ và sống động cho làn da.',
        uses: 'Giải phóng lớp da thô ráp và khô cứng để tạo nền da tối ưu, cho phép da tiếp nhận dinh dưỡng ở các sản phẩm sau 1 cách tốt nhất.',
        usageGuide: ' Tinh chất khởi nguồn > Tinh dầu dưỡng da > Kem dưỡng mắt > Kem dưỡng da',
        brandId: 6,
        categoryId: 1,
        status: 1,
        startDate: "2025-03-8T17:00:00",
        endDate: "2025-03-24T17:00:00",
        images: [
            {
                "imageUrl": "https://product.hstatic.net/200000536477/product/z4236421889863_cf39552f659a46c5a997ff3d7b9ff585_43a56a79d56145f8bd5bf464512f5f33.jpg",
                "publicId": "uploads/products/product_6_36054bc5-77c9-4c3a-93b0-b10d8b450cd7",
                "typeImage": "Product",
                "id": 28,
                "createdDate": "0001-01-01T00:00:00",
                "updatedDate": null,
                "createdBy": null,
                "updatedBy": null,
                "isActive": false,
                "isDeleted": false,
                "displayOrder": 1
            }
        ]
    },
]

interface HotSaleProps {
    initialData?: any[];
}

const HotSale: React.FC<HotSaleProps> = ({ initialData }) => {

    const theme = useTheme();
    const { t } = useTranslation();

    const saleEndTime = '2025-05-26T23:59:59';
    const [publicProducts, setPublicProducts] = useState({
        data: [],
        total: 0
    });
    const [loading, setLoading] = useState(false);

    const handleGetListProduct = async () => {
        setLoading(true)
        try {
            const res = await getEndowProducts({ numberTop: 20 });
            if (res?.result) {
                setPublicProducts({
                    data: res.result,
                    total: res.result.length
                })
            } else {
                 setPublicProducts({ data: [], total: 0 })
            }
        } catch (error) {
            console.error("Failed to fetch endow products:", error);
            setPublicProducts({ data: [], total: 0 }) // Reset on error
        } finally {
            setLoading(false) // Ensure loading is set to false in both success and error cases
        }
    }

    useEffect(() => {
        handleGetListProduct()
    }, [])

    const skeletonCount = 20; // Match the numberTop parameter in getEndowProducts

    return (
        <Box sx={{ backgroundColor: theme.palette.secondary.main, width: '100%', height: '100%', padding: '10px' }}>
            <Box sx={{ width: '100%', backgroundColor: theme.palette.background.paper, maxWidth: '1440px', margin: '0 auto', borderRadius: '8px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
                        <Typography sx={{ textTransform: 'uppercase', cursor: 'pointer' }} variant="h3">Ưu đãi hot, đừng bỏ lỡ!!</Typography>
                        <Typography>Sản phẩm sẽ trở về giá gốc khi hết giờ</Typography>
                    </Box>
                    <Box>
                        <CountdownTimer saleEndTime={saleEndTime} />
                    </Box>
                </Box>
                <Box sx={{ padding: '10px' }}>
                    <Grid container spacing={{ md: 4, sm: 3, xs: 2 }}>
                        {loading ? (
                             // Render skeletons based on the expected count
                            Array.from(new Array(skeletonCount)).map((_, index) => (
                                <Grid item key={index} md={2.4} sm={4} xs={12}>
                                    <ProductCard item={{} as TProduct} isLoading={true} />
                                </Grid>
                            ))
                        ) : publicProducts?.data?.length > 0 ? (
                            <>
                                {publicProducts?.data?.map((item: TProduct) => {
                                    return (
                                        <Grid item key={item.id} md={2.4} sm={4} xs={12}>
                                            <ProductCard item={item} showProgress={true} />
                                        </Grid>
                                    )
                                })}
                            </>
                        ) : (
                            <Box sx={{
                                padding: "20px",
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <NoData imageWidth="60px" imageHeight="60px" textNodata={t("no_data")} />
                            </Box>
                        )}
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default HotSale
