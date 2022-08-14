import sanityClient from '@sanity/client' 

export const client =   sanityClient(   {
    projectId: 'i92on72n',
    dataset: 'production',
    apiVersion: '2021-03-25',
    token: 'sk0MNF1Tna2yB2XKeGG42XXgLJX0hug4IjvJ8osXNCSJBncN8wOBGinjChQms6sPT6Ld46rgimsHoNHAhmxBDrdiNHwDQR0BTwSO7mpAC5xuS8JbKiDc5WFwecIAfT5a7ZRlzJYXKFts6XFS4NGQjbGV7oS0wUSDcJlqRxvJ50StSPqPZT76',
    useCdn: false,
}) 