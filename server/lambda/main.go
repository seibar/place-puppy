package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"io/ioutil"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	fmt.Printf("request: %v", request)

	sess, err := session.NewSession(&aws.Config{Region: aws.String("us-east-2")})

	if err != nil {
		return errorResponse(err)
	}

	s3client := s3.New(sess)

	bucket := "place-puppy"
	key := "10b-1500x645.jpg"

	obj, err := s3client.GetObject(&s3.GetObjectInput{
		Bucket: &bucket,
		Key:    &key,
	})

	if err != nil {
		return errorResponse(err)
	}

	buff, err := ioutil.ReadAll(obj.Body)
	if err != nil {
		return errorResponse(err)
	}

	str := base64.StdEncoding.EncodeToString(buff)

	return events.APIGatewayProxyResponse{
		Body: str,
		Headers: map[string]string{
			"Content-Type": "image/jpeg",
		},
		StatusCode:      200,
		IsBase64Encoded: true,
	}, nil
}

func errorResponse(err error) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{Body: err.Error(), StatusCode: 500}, nil
}

func main() {
	lambda.Start(handler)
}
