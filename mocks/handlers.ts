import { rest } from 'msw';

export const handlers = [

  rest.get('http://localhost:3001/api/manual-approval/history', (req, res, ctx) => {
    const page = req.url.searchParams.get('page');
    const limit = req.url.searchParams.get('limit');

    return res(
      ctx.status(200),
      ctx.json({
        responseCode: '0200',
        responseDescription: 'SUCCESS',
        data: {
          data: [
            {
              id: '01073d80-754b-449c-8808-f56e411a91c6',
              name: 'Harun Al Rosyid',
              idNo: '3216112205960002',
              status: 'APPROVED',
              reason: 'Jele',
              createdAt: '2025-02-18T15:58:22.781492+07:00',
              updatedAt: '2025-02-18T15:58:22.781492+07:00',
            },
            {
              id: '1093be42-52b6-48f9-83c9-dcae0d401abc',
              name: 'Destalia Sallyna',
              idNo: '3273246112970001',
              status: 'APPROVED',
              reason: 'sesuai',
              createdAt: '2025-02-11T15:34:25.602636+07:00',
              updatedAt: '2025-02-11T15:34:25.602637+07:00',
            },
            {
              id: '1936ccf3-1f40-48d3-95f1-bb7e2b0724dc',
              name: 'Lovindo situngkir',
              idNo: '3277012212940001',
              status: 'APPROVED',
              reason: 'anaknya baik banget',
              createdAt: '2025-02-05T09:45:22.192401+07:00',
              updatedAt: '2025-02-05T09:45:22.192402+07:00',
            },
            // Data lainnya bisa lanjut disini...
          ],
          draw: 0,
          recordsFiltered: 238,
          recordsTotal: 238,
          hasMore: true,
        },
      })
    );
  }),
  
];
