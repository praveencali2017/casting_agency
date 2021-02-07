#!/bin/bash
export DATABASE_URL="postgresql://postgres@localhost:5432/casting_agency_db"
export TESTING_DATABASE_URL="postgresql://postgres@localhost:5432/test_casting_agency_db"
export AUTH0_DOMAIN="dev-prav-auth.us.auth0.com"
export AUTH0_API_ALGORITHMS="RS256"
export AUTH0_API_AUDIENCE="casting"

# Tokens
export ASSISTANT="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlVfWm1VUFFFTUM2LTUxX1FQNms4ZyJ9.eyJpc3MiOiJodHRwczovL2Rldi1wcmF2LWF1dGgudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYwMWNhYTFkZTEzNzM1MDA2YTdkNDVmNiIsImF1ZCI6ImNhc3RpbmciLCJpYXQiOjE2MTI2NTUxODYsImV4cCI6MTYxMjc0MTU4NiwiYXpwIjoiRGF2VTRpNTZtTWs0cVBjazNydVNsYTI2M3hFY3p6SjUiLCJndHkiOiJwYXNzd29yZCIsInBlcm1pc3Npb25zIjpbImdldDphY3RvcnMiLCJnZXQ6bW92aWVzIl19.XJ3JHU8UXox2BEE9Zt6XrQrtIaaFPiN4MkMdTg3G3-SM0TadM5KeUAkcRL6NF5RIz7R7gR0r4qUusKGE5MX-K8jF8DifINxPNO-b5lqtfKrc-jJzwfC1D5x18YgyUQmCAnLp2jTyv9BpyQ9cWe43xmqqmDHliCDPL3eeKYbavmdxXMySwVTip1ZZdVXg_lvEqwbCIZGP9XBm8mTe7SnhWx6FZj2IPUrAtwjglgCrpjiDpH6Ur7hnmfOjenfDJS-fgGLmGPGVJwS4zssWhy6VTW6t7icgyXu--zNI7_7KLZgds5wid9hcOaDwGf6SgQXNLAd-YKRg66ErwJlm_C6b2g"
export DIRECTOR="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlVfWm1VUFFFTUM2LTUxX1FQNms4ZyJ9.eyJpc3MiOiJodHRwczovL2Rldi1wcmF2LWF1dGgudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYwMWNhOWU5M2U4MTc2MDA2ODBiYmYwYSIsImF1ZCI6ImNhc3RpbmciLCJpYXQiOjE2MTI2NTUxODYsImV4cCI6MTYxMjc0MTU4NiwiYXpwIjoiRGF2VTRpNTZtTWs0cVBjazNydVNsYTI2M3hFY3p6SjUiLCJndHkiOiJwYXNzd29yZCIsInBlcm1pc3Npb25zIjpbImFkZDphY3RvcnMiLCJkZWxldGU6YWN0b3JzIiwiZ2V0OmFjdG9ycyIsImdldDptb3ZpZXMiLCJtYW5hZ2U6Y2FzdCIsInVwZGF0ZTphY3RvcnMiLCJ1cGRhdGU6bW92aWVzIl19.eeBphgWBjEB6X4p_wsUUAwosf_xsLpRaVl1iohhl_AaMdXj-W_9ZYiIIhDJqEK4_ORnLbvrNhJsLS24dZYLB0je5MB8_O-BE0TicR7jDtlh1_vXW-GpNjumRN8s58Swf1vwS3hMsV4xOKkKplls13zAnQVbUaB183UAqMYOHGf53skOurHOpFgaG34KzVd2yInBRD643P5HWit8feVE9FDWYnxiT_A1UtkIQtdaKy2ixYbSKRCPQdEtEupUZg9LPNRLzmy2WlB31-BidHUaJW4Udw8ptRoJYvoygqqv1FzwM1GAHoXrlsXOBMKuPh5BhwbDxgougItS5aLsrV2cCZA"
export PRODUCER="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlVfWm1VUFFFTUM2LTUxX1FQNms4ZyJ9.eyJpc3MiOiJodHRwczovL2Rldi1wcmF2LWF1dGgudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYwMWNhOTc0ZjA4MzAzMDA2OTVlZTBjOCIsImF1ZCI6ImNhc3RpbmciLCJpYXQiOjE2MTI2NTUxODUsImV4cCI6MTYxMjc0MTU4NSwiYXpwIjoiRGF2VTRpNTZtTWs0cVBjazNydVNsYTI2M3hFY3p6SjUiLCJndHkiOiJwYXNzd29yZCIsInBlcm1pc3Npb25zIjpbImFkZDphY3RvcnMiLCJhZGQ6bW92aWVzIiwiZGVsZXRlOmFjdG9ycyIsImRlbGV0ZTptb3ZpZXMiLCJnZXQ6YWN0b3JzIiwiZ2V0Om1vdmllcyIsIm1hbmFnZTpjYXN0IiwidXBkYXRlOmFjdG9ycyIsInVwZGF0ZTptb3ZpZXMiXX0.mkUvbuyZIQjxbZazQHz1BToCUN-U7UuKyR1FCEbaOuEfuFaXZPKVqwOAjcsmufw8v5VG3zR-MmjymFUHvCjmeqM7Rpz801MCwejrNTDh0UCs6xlxeITnRUoUbIKmy0wHJvLKsxDukfxtZklcFo9vWhJedx0zTecWaIRHLo-yGGDoORaLQDpBO7shmDewtCcqyRGapipKCTLxgM5KMadrcpB9QZPqrN42sRqyEf6kw1RVP3uvJWuevaJe7fMb4lRBbIVnrHNd7u6AckoGBgAlbywc9hC2vXbo7UyqAInesfkjqMcm69FJ5IiWeKc2Hbqa-EM9TmlFWLBWshnSQXbWuw"