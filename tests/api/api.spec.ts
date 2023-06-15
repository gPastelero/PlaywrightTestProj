//https://reqres.in/
import {test, expect} from '@playwright/test'

test.describe.parallel('API Testing', () => 
{
    const baseUrl = 'https://reqres.in/api'
    test("Simple API Test - Assert Response Status",async ({request})=>
    {
        const response = await request.get(`${baseUrl}/users/2`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        //console.log(responseBody)
    })

    test("Simple API Test - Assert Invalid Endpoint",async ({request})=>
    {
        const response = await request.get(`${baseUrl}/users/fakeEndpoint`)
        expect(response.status()).toBe(404)
    })

    test("GET Req - Get User Detail",async ({request})=>
    {
        const response = await request.get(`${baseUrl}/users/1`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(1)
        expect(responseBody.data.first_name).toBe('George')
        expect(responseBody.data.email).toBeTruthy() //assert to not be null/blank
        //console.log(responseBody)
    })

    test('POST Request - Create New User', async ({ request }) => {
        const response = await request.post(`${baseUrl}/user`,{
            data:{
                id:1001
            },
        })

        const responseBody = JSON.parse(await response.text())
        //console.log(responseBody)
        expect(responseBody.id).toBe(1001)
        expect(responseBody.createdAt).toBeTruthy()
      })

      test('POST Request - Login', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
          data: {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka',
          },
        })
        const respBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(respBody.token).toBeTruthy()
      })
      
      test('POST Request - Login Fail', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
          data: {
            email: 'eve.holt@reqres.in',
          },
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(400)
        expect(responseBody.error).toBe('Missing password')
      })

      test('PUT Request - Update User', async({request})=>
      {
        const response = await request.put(`${baseUrl}/users/2`, {
            data: 
            {
              name: 'Morbius',
              //job: 'Morber',
            },
          })
        const respBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(respBody.name).toBe('Morbius')
       //expect(respBody.name).toBe('Morber')
        expect(respBody.updatedAt).toBeTruthy()
      })

      test('DELETE Request - Delete User', async ({ request }) => {
        const response = await request.delete(`${baseUrl}/users/2`)
        expect(response.status()).toBe(204)
      })
})