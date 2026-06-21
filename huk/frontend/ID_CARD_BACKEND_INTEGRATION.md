# ID Card Order Backend Handoff

The frontend now includes `idCardDetails` only when the selected product has
`type: "idcard"`.

## Request shape

`POST /tshirt/createOrder` continues to use JSON and now includes:

```json
{
  "name": "Payment customer name",
  "email": "customer@example.com",
  "phoneNumber": "9876543210",
  "productType": "idcard",
  "amount": 1,
  "sizeQuantities": [{ "size": "Standard", "quantity": 1 }],
  "totalQuantity": 1,
  "idCardDetails": {
    "cardholderName": "Name printed on ID",
    "photoBase64": "data:image/jpeg;base64,...",
    "photoFileName": "id-photo.jpg",
    "photoMimeType": "image/jpeg",
    "photoWidth": 600,
    "photoHeight": 771,
    "photoByteSize": 172450,
    "compressionQuality": 0.82
  }
}
```

## Recommended backend workflow

1. Accept and validate `idCardDetails` only when `productType` is `idcard`.
2. Reject missing cardholder names or photos before creating the Razorpay order.
3. Remove the `data:image/jpeg;base64,` prefix and Base64-decode the photo.
4. Verify the decoded bytes are a real JPEG, meet the required dimensions, and
   are no larger than the backend limit (recommended: 250 KB).
5. Store the decoded binary bytes directly in MySQL using `MEDIUMBLOB`. Do not
   store the Base64 string because it uses roughly 33% more database space.
6. Store the MIME type, dimensions, original filename, and byte size in separate
   columns.
7. Associate the photo with the internal order ID and Razorpay order ID.
8. Keep the order unfulfilled until payment verification succeeds.
9. Expose the photo only through an authenticated admin endpoint. Do not include
   the photo bytes or Base64 in order-list responses.
10. Apply a deletion/retention policy because ID photos are personal data.

Suggested database fields:

```text
product_type
id_card_name
id_card_photo MEDIUMBLOB
id_card_photo_mime_type
id_card_photo_file_name
id_card_photo_byte_size
id_card_photo_width
id_card_photo_height
```

## Spring Boot entity example

```java
@Lob
@Basic(fetch = FetchType.LAZY)
@Column(name = "id_card_photo", columnDefinition = "MEDIUMBLOB")
private byte[] idCardPhoto;

private String idCardPhotoMimeType;
private String idCardPhotoFileName;
private Integer idCardPhotoByteSize;
private Integer idCardPhotoWidth;
private Integer idCardPhotoHeight;
```

Decode before saving:

```java
String encoded = request.getIdCardDetails().getPhotoBase64();
String base64 = encoded.substring(encoded.indexOf(',') + 1);
byte[] photoBytes = Base64.getDecoder().decode(base64);
order.setIdCardPhoto(photoBytes);
```

Create a protected endpoint such as:

```text
GET /api/admin/orders/{orderId}/id-photo
```

It should return the stored bytes with `Content-Type: image/jpeg`. The normal
orders endpoint should return only a `photoAvailable` flag or the protected
endpoint path, never the full image data.

The browser crops the selected image to a 600 x 771 JPEG using high-quality
resampling and adaptively lowers JPEG quality until the result is approximately
180 KB or smaller. It never lowers quality below 72%. The backend
must still independently validate the image and must not trust the MIME type,
size, quality, or dimensions supplied by the browser.
