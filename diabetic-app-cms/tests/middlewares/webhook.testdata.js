const { expect } = require("@jest/globals");
const PaymentEventSource = require("../../src/api/payment/services/PaymentEventSource");

function unparsedBody() {
  dummy: {
    body: "shan";
  }
}

module.exports = {
  mockPaymentIntentContext: {
    request: {
      body: {
        id: "evt_3M2UYVI3Fb4xUkyy1Nni7q9T",
        object: "event",
        api_version: "2020-08-27",
        created: 1668062887,
        data: {
          object: {
            id: "pi_3M2UYVI3Fb4xUkyy1B9HkPgj",
            object: "payment_intent",
            amount: 10000,
            amount_capturable: 0,
            amount_details: [Object],
            amount_received: 0,
            application: null,
            application_fee_amount: null,
            automatic_payment_methods: [Object],
            canceled_at: null,
            cancellation_reason: null,
            capture_method: "automatic",
            charges: [Object],
            client_secret:
              "pi_3M2UYVI3Fb4xUkyy1B9HkPgj_secret_wg5AnEbNmtLtnhMrVWt5zt2Os",
            confirmation_method: "automatic",
            created: 1668062887,
            currency: "aed",
            customer: null,
            description: null,
            invoice: null,
            last_payment_error: null,
            livemode: false,
            metadata: [Object],
            next_action: null,
            on_behalf_of: null,
            payment_method: null,
            payment_method_options: [Object],
            payment_method_types: [Array],
            processing: null,
            receipt_email: null,
            review: null,
            setup_future_usage: null,
            shipping: null,
            source: null,
            statement_descriptor: null,
            statement_descriptor_suffix: null,
            status: "requires_payment_method",
            transfer_data: null,
            transfer_group: null,
          },
        },
        livemode: false,
        pending_webhooks: 2,
        request: {
          id: "req_jYy3yfwUrNlpDz",
          idempotency_key: "662680e3-27fa-4e90-9cff-1f9f1dd6fe18",
        },
        type: "payment_intent.created",
        [Symbol(unparsedBody)]:
          "{\n" +
          '  "id": "evt_3M2UYVI3Fb4xUkyy1Nni7q9T",\n' +
          '  "object": "event",\n' +
          '  "api_version": "2020-08-27",\n' +
          '  "created": 1668062887,\n' +
          '  "data": {\n' +
          '    "object": {\n' +
          '      "id": "pi_3M2UYVI3Fb4xUkyy1B9HkPgj",\n' +
          '      "object": "payment_intent",\n' +
          '      "amount": 10000,\n' +
          '      "amount_capturable": 0,\n' +
          '      "amount_details": {\n' +
          '        "tip": {\n' +
          "        }\n" +
          "      },\n" +
          '      "amount_received": 0,\n' +
          '      "application": null,\n' +
          '      "application_fee_amount": null,\n' +
          '      "automatic_payment_methods": {\n' +
          '        "enabled": true\n' +
          "      },\n" +
          '      "canceled_at": null,\n' +
          '      "cancellation_reason": null,\n' +
          '      "capture_method": "automatic",\n' +
          '      "charges": {\n' +
          '        "object": "list",\n' +
          '        "data": [\n' +
          "\n" +
          "        ],\n" +
          '        "has_more": false,\n' +
          '        "total_count": 0,\n' +
          '        "url": "/v1/charges?payment_intent=pi_3M2UYVI3Fb4xUkyy1B9HkPgj"\n' +
          "      },\n" +
          '      "client_secret": "pi_3M2UYVI3Fb4xUkyy1B9HkPgj_secret_wg5AnEbNmtLtnhMrVWt5zt2Os",\n' +
          '      "confirmation_method": "automatic",\n' +
          '      "created": 1668062887,\n' +
          '      "currency": "aed",\n' +
          '      "customer": null,\n' +
          '      "description": null,\n' +
          '      "invoice": null,\n' +
          '      "last_payment_error": null,\n' +
          '      "livemode": false,\n' +
          '      "metadata": {\n' +
          '        "prescriptionId": "18",\n' +
          '        "orderId": "10",\n' +
          '        "patientId": "16"\n' +
          "      },\n" +
          '      "next_action": null,\n' +
          '      "on_behalf_of": null,\n' +
          '      "payment_method": null,\n' +
          '      "payment_method_options": {\n' +
          '        "card": {\n' +
          '          "installments": null,\n' +
          '          "mandate_options": null,\n' +
          '          "network": null,\n' +
          '          "request_three_d_secure": "automatic"\n' +
          "        }\n" +
          "      },\n" +
          '      "payment_method_types": [\n' +
          '        "card"\n' +
          "      ],\n" +
          '      "processing": null,\n' +
          '      "receipt_email": null,\n' +
          '      "review": null,\n' +
          '      "setup_future_usage": null,\n' +
          '      "shipping": null,\n' +
          '      "source": null,\n' +
          '      "statement_descriptor": null,\n' +
          '      "statement_descriptor_suffix": null,\n' +
          '      "status": "requires_payment_method",\n' +
          '      "transfer_data": null,\n' +
          '      "transfer_group": null\n' +
          "    }\n" +
          "  },\n" +
          '  "livemode": false,\n' +
          '  "pending_webhooks": 2,\n' +
          '  "request": {\n' +
          '    "id": "req_jYy3yfwUrNlpDz",\n' +
          '    "idempotency_key": "662680e3-27fa-4e90-9cff-1f9f1dd6fe18"\n' +
          "  },\n" +
          '  "type": "payment_intent.created"\n' +
          "}",
      },
      headers: {
        host: "localhost:1337",
        "user-agent": "Stripe/1.0 (+https://stripe.com/docs/webhooks)",
        "content-length": "2136",
        accept: "*/*; q=0.5, application/xml",
        "cache-control": "no-cache",
        "content-type": "application/json; charset=utf-8",
        "stripe-signature":
          "t=1668062887,v1=d22b622a3d8a03cf3ece1ad0392fa29d68f32a894ebaee2f00b81f1568eef142,v0=2521a222b95d210da1b43815102d43387eb065a46e8c07b5d6ba9ea826a7df78",
        "accept-encoding": "gzip",
      },
    },
    id: "evt_3M28zwI3Fb4xUkyy1TBvfj4h",
    object: "event",
    api_version: "2020-08-27",
    created: 1667980020,
    data: {
      object: {
        id: "pi_3M28zwI3Fb4xUkyy13wXiIpF",
        object: "payment_intent",
        amount: 10000,
        client_secret:
          "pi_3M28zwI3Fb4xUkyy13wXiIpF_secret_snJr5y19VfRAXNqJuBMXbzTtc",
        confirmation_method: "automatic",
        metadata: [Object],
        payment_method_options: [Object],
        payment_method_types: [Array],
        status: "requires_payment_method",
      },
    },
    livemode: false,
    pending_webhooks: 2,
    type: "payment_intent.created",
  },

  mockPaymentIntentEvent: {
    id: "evt_3M1lyKI3Fb4xUkyy198LkB2I",
    object: "event",
    api_version: "2020-08-27",
    created: 1667891508,
    data: {
      object: {
        id: "pi_3M1lyKI3Fb4xUkyy1VThQeQf",
        object: "payment_intent",
        amount: 2000,
        amount_capturable: 0,
        amount_details: [Object],
        amount_received: 0,
        application: null,
        application_fee_amount: null,
        automatic_payment_methods: null,
        canceled_at: null,
        cancellation_reason: null,
        capture_method: "automatic",
        charges: [Object],
        client_secret:
          "pi_3M1lyKI3Fb4xUkyy1VThQeQf_secret_PjOmxkV8zPaCpwsoK6GoRaCHF",
        confirmation_method: "automatic",
        created: 1667891508,
        currency: "usd",
        customer: null,
        description: "(created by Stripe CLI)",
        invoice: null,
        last_payment_error: null,
        livemode: false,
        metadata: {},
        next_action: null,
        on_behalf_of: null,
        payment_method: null,
        payment_method_options: [Object],
        payment_method_types: [Array],
        processing: null,
        receipt_email: null,
        review: null,
        setup_future_usage: null,
        shipping: [Object],
        source: null,
        statement_descriptor: null,
        statement_descriptor_suffix: null,
        status: "requires_payment_method",
        transfer_data: null,
        transfer_group: null,
      },
    },
    livemode: false,
    pending_webhooks: 2,
    request: {
      id: "req_5riWdz4ltLycI2",
      idempotency_key: "71e8ef31-ec17-4abe-877f-1ba08826c47d",
    },
    type: "payment_intent.created",
  },

  mockOrder: {
    id: 10,
    schedule: "2022-11-09T07:00:43.000Z",
    amount: 100,
    currency: "AED",
    status: "Insurance Approved",
    createdAt: "2022-11-08T05:36:59.332Z",
    updatedAt: "2022-11-10T08:38:32.599Z",
    payment: null,
    patient: {
      id: 16,
      username: "971529029931",
      email: "1@gmail.com",
      provider: "local",
      password: "$2a$10$glBPCknFoFY9NiBNE0Jm0exFxrSgrF68Cmb.Z1BZ/ZKNKr1PgxeS2",
      resetPasswordToken: null,
      confirmationToken: null,
      confirmed: true,
      blocked: false,
      createdAt: "2022-09-02T02:42:28.031Z",
      updatedAt: "2022-11-10T06:47:29.370Z",
      passwordExpiresAt: "2022-11-10T06:52:09.269Z",
      firstName: "shanawaj",
      middleName: null,
      lastName: "khan",
      mobileNumber: null,
      emiratesId: "1984-2004-1112222-6",
      reminderFrequency: 30,
      passwordGeneratedAt: "2022-11-10T06:47:09.269Z",
      maxUnsuccessfulLoginCount: 0,
      lastUnsuccessfulLoginTime: "2022-10-10T08:02:47.626Z",
    },
    prescription: {
      id: 18,
      firstName: "shanawaj",
      lastName: "khan",
      status: "New",
      createdAt: "2022-11-08T05:36:28.894Z",
      updatedAt: "2022-11-08T05:36:28.894Z",
    },
  },
  mockPaymentMethod: {
    id: "pm_1M2bVuI3Fb4xUkyyD0Vz9QWy",
    object: "payment_method",
    billing_details: {
      address: {
        city: null,
        country: "AE",
        line1: null,
        line2: null,
        postal_code: null,
        state: null,
      },
      email: null,
      name: null,
      phone: null,
    },
    card: {
      brand: "visa",
      checks: {
        address_line1_check: null,
        address_postal_code_check: null,
        cvc_check: "pass",
      },
      country: "US",
      exp_month: 2,
      exp_year: 2023,
      fingerprint: "xskb6Q5VBYKF9eW2",
      funding: "credit",
      generated_from: null,
      last4: "4242",
      networks: { available: [Array], preferred: null },
      three_d_secure_usage: { supported: true },
      wallet: null,
    },
    created: 1668089634,
    customer: null,
    livemode: false,
    metadata: {},
    type: "card",
  },

  mockPaymentEntity: {
    id: 72,
    maskedCardNumber: null,
    amount: 100,
    currency: "AED",
    status: "Payment Method Required",
    providerPaymentId: "pi_3M2bVgI3Fb4xUkyy0f19ybXI",
    providerMetadata: {
      id: "pi_3M2bVgI3Fb4xUkyy0f19ybXI",
      amount: 10000,
      object: "payment_intent",
      review: null,
      source: null,
      status: "requires_payment_method",
      charges: {
        url: "/v1/charges?payment_intent=pi_3M2bVgI3Fb4xUkyy0f19ybXI",
        data: [],
        object: "list",
        has_more: false,
        total_count: 0,
      },
      created: 1668089620,
      invoice: null,
      currency: "aed",
      customer: null,
      livemode: false,
      metadata: { orderId: "10", patientId: "16", prescriptionId: "18" },
      shipping: null,
      processing: null,
      application: null,
      canceled_at: null,
      description: null,
      next_action: null,
      on_behalf_of: null,
      client_secret:
        "pi_3M2bVgI3Fb4xUkyy0f19ybXI_secret_WdPcPAvhsaljs1IyYnbOQXs3i",
      receipt_email: null,
      transfer_data: null,
      amount_details: { tip: {} },
      capture_method: "automatic",
      payment_method: null,
      transfer_group: null,
      amount_received: 0,
      amount_capturable: 0,
      last_payment_error: null,
      setup_future_usage: null,
      cancellation_reason: null,
      confirmation_method: "automatic",
      payment_method_types: ["card"],
      statement_descriptor: null,
      application_fee_amount: null,
      payment_method_options: { card: [Object] },
      automatic_payment_methods: { enabled: true },
      statement_descriptor_suffix: null,
    },
    correlationId: "16",
    createdAt: "2022-11-10T14:13:41.028Z",
    updatedAt: "2022-11-10T14:13:41.289Z",
    paymentType: null,
    paymentSubType: null,
    history: [
      {
        id: 144,
        type: "Payment Method Required",
        timeStamp: "2022-11-10T14:13:40.973Z",
        metadata: [Object],
        eventSource: null,
      },
      {
        id: 145,
        type: "Payment Method Required",
        timeStamp: "2022-11-10T14:13:41.274Z",
        metadata: [Object],
        eventSource: "Application",
      },
    ],
    patient: {
      id: 16,
      username: "971529029931",
      email: "1@gmail.com",
      provider: "local",
      password: "$2a$10$glBPCknFoFY9NiBNE0Jm0exFxrSgrF68Cmb.Z1BZ/ZKNKr1PgxeS2",
      resetPasswordToken: null,
      confirmationToken: null,
      confirmed: true,
      blocked: false,
      createdAt: "2022-09-02T02:42:28.031Z",
      updatedAt: "2022-11-10T06:47:29.370Z",
      passwordExpiresAt: "2022-11-10T06:52:09.269Z",
      firstName: "shanawaj",
      middleName: null,
      lastName: "khan",
      mobileNumber: null,
      emiratesId: "1984-2004-1112222-6",
      reminderFrequency: 30,
      passwordGeneratedAt: "2022-11-10T06:47:09.269Z",
      maxUnsuccessfulLoginCount: 0,
      lastUnsuccessfulLoginTime: "2022-10-10T08:02:47.626Z",
    },
    order: {
      id: 10,
      schedule: "2022-11-09T07:00:43.000Z",
      amount: 100,
      currency: "AED",
      status: "Require Payment",
      createdAt: "2022-11-08T05:36:59.332Z",
      updatedAt: "2022-11-10T14:13:40.974Z",
    },
  },

  mockPaymentIntentSuccessEvent: {
    id: "evt_3M2bVgI3Fb4xUkyy0EqRMaTj",
    object: "event",
    api_version: "2020-08-27",
    created: 1668089635,
    data: {
      object: {
        id: "ch_3M2bVgI3Fb4xUkyy0cdAeXSY",
        object: "charge",
        amount: 10000,
        amount_captured: 10000,
        amount_refunded: 0,
        application: null,
        application_fee: null,
        application_fee_amount: null,
        balance_transaction: "txn_3M2bVgI3Fb4xUkyy0UbPOqBT",
        billing_details: [Object],
        calculated_statement_descriptor: "Stripe",
        captured: true,
        created: 1668089635,
        currency: "aed",
        customer: null,
        description: null,
        destination: null,
        dispute: null,
        disputed: false,
        failure_balance_transaction: null,
        failure_code: null,
        failure_message: null,
        fraud_details: {},
        invoice: null,
        livemode: false,
        metadata: [Object],
        on_behalf_of: null,
        order: null,
        outcome: [Object],
        paid: true,
        payment_intent: "pi_3M2bVgI3Fb4xUkyy0f19ybXI",
        payment_method: "pm_1M2bVuI3Fb4xUkyyD0Vz9QWy",
        payment_method_details: [Object],
        receipt_email: null,
        receipt_number: null,
        receipt_url:
          "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTEU2allJM0ZiNHhVa3l5KKSOtJsGMga1LQDblFM6LBYeRiolTduJpKa2ns-Nj6Vy9yh0dkoWhx_PYmiq3TCYRzEr9D7XyCaHJtUF",
        refunded: false,
        refunds: [Object],
        review: null,
        shipping: null,
        source: null,
        source_transfer: null,
        statement_descriptor: null,
        statement_descriptor_suffix: null,
        status: "succeeded",
        transfer_data: null,
        transfer_group: null,
      },
    },
    livemode: false,
    pending_webhooks: 2,
    request: {
      id: "req_CLDKCkPd5Pm7Il",
      idempotency_key: "1606bcc1-777e-42b3-9156-320c4664ca84",
    },
    type: "charge.succeeded",
  },
  providerPaymentDetails: {
    status: "Succeeded",
    maskedCardNumber: "4242",
    providerMetadata: {
      id: "evt_3M2bVgI3Fb4xUkyy0EqRMaTj",
      object: "event",
      api_version: "2020-08-27",
      created: 1668089635,
      data: {
        object: {
          id: "ch_3M2bVgI3Fb4xUkyy0cdAeXSY",
          object: "charge",
          amount: 10000,
          amount_captured: 10000,
          amount_refunded: 0,
          application: null,
          application_fee: null,
          application_fee_amount: null,
          balance_transaction: "txn_3M2bVgI3Fb4xUkyy0UbPOqBT",
          billing_details: [Object],
          calculated_statement_descriptor: "Stripe",
          captured: true,
          created: 1668089635,
          currency: "aed",
          customer: null,
          description: null,
          destination: null,
          dispute: null,
          disputed: false,
          failure_balance_transaction: null,
          failure_code: null,
          failure_message: null,
          fraud_details: {},
          invoice: null,
          livemode: false,
          metadata: [Object],
          on_behalf_of: null,
          order: null,
          outcome: [Object],
          paid: true,
          payment_intent: "pi_3M2bVgI3Fb4xUkyy0f19ybXI",
          payment_method: "pm_1M2bVuI3Fb4xUkyyD0Vz9QWy",
          payment_method_details: [Object],
          receipt_email: null,
          receipt_number: null,
          receipt_url:
            "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTEU2allJM0ZiNHhVa3l5KKSOtJsGMga1LQDblFM6LBYeRiolTduJpKa2ns-Nj6Vy9yh0dkoWhx_PYmiq3TCYRzEr9D7XyCaHJtUF",
          refunded: false,
          refunds: [Object],
          review: null,
          shipping: null,
          source: null,
          source_transfer: null,
          statement_descriptor: null,
          statement_descriptor_suffix: null,
          status: "succeeded",
          transfer_data: null,
          transfer_group: null,
        },
      },
      livemode: false,
      pending_webhooks: 2,
      request: {
        id: "req_CLDKCkPd5Pm7Il",
        idempotency_key: "1606bcc1-777e-42b3-9156-320c4664ca84",
      },
      type: "charge.succeeded",
    },
    paymentSubType: "Visa",
    paymentType: "Card",
  },

  mockPaymentIntentFailedContext: {
    request: {
      body: {
        id: "evt_3M2UYVI3Fb4xUkyy1Nni7q9T",
        object: "event",
        api_version: "2020-08-27",
        created: 1668062887,
        data: {
          object: {
            id: "pi_3M2UYVI3Fb4xUkyy1B9HkPgj",
            object: "payment_intent",
            amount: 10000,
            amount_capturable: 0,
            amount_details: [Object],
            amount_received: 0,
            application: null,
            application_fee_amount: null,
            automatic_payment_methods: [Object],
            canceled_at: null,
            cancellation_reason: null,
            capture_method: "automatic",
            charges: [Object],
            client_secret:
                "pi_3M2UYVI3Fb4xUkyy1B9HkPgj_secret_wg5AnEbNmtLtnhMrVWt5zt2Os",
            confirmation_method: "automatic",
            created: 1668062887,
            currency: "aed",
            customer: null,
            description: null,
            invoice: null,
            last_payment_error: null,
            livemode: false,
            metadata: [Object],
            next_action: null,
            on_behalf_of: null,
            payment_method: null,
            payment_method_options: [Object],
            payment_method_types: [Array],
            processing: null,
            receipt_email: null,
            review: null,
            setup_future_usage: null,
            shipping: null,
            source: null,
            statement_descriptor: null,
            statement_descriptor_suffix: null,
            status: "requires_payment_method",
            transfer_data: null,
            transfer_group: null,
          },
        },
        livemode: false,
        pending_webhooks: 2,
        request: {
          id: "req_jYy3yfwUrNlpDz",
          idempotency_key: "662680e3-27fa-4e90-9cff-1f9f1dd6fe18",
        },
        type: "payment_intent.created",
        [Symbol(unparsedBody)]:
        "{\n" +
        '  "id": "evt_3M2UYVI3Fb4xUkyy1Nni7q9T",\n' +
        '  "object": "event",\n' +
        '  "api_version": "2020-08-27",\n' +
        '  "created": 1668062887,\n' +
        '  "data": {\n' +
        '    "object": {\n' +
        '      "id": "pi_3M2UYVI3Fb4xUkyy1B9HkPgj",\n' +
        '      "object": "payment_intent",\n' +
        '      "amount": 10000,\n' +
        '      "amount_capturable": 0,\n' +
        '      "amount_details": {\n' +
        '        "tip": {\n' +
        "        }\n" +
        "      },\n" +
        '      "amount_received": 0,\n' +
        '      "application": null,\n' +
        '      "application_fee_amount": null,\n' +
        '      "automatic_payment_methods": {\n' +
        '        "enabled": true\n' +
        "      },\n" +
        '      "canceled_at": null,\n' +
        '      "cancellation_reason": null,\n' +
        '      "capture_method": "automatic",\n' +
        '      "charges": {\n' +
        '        "object": "list",\n' +
        '        "data": [\n' +
        "\n" +
        "        ],\n" +
        '        "has_more": false,\n' +
        '        "total_count": 0,\n' +
        '        "url": "/v1/charges?payment_intent=pi_3M2UYVI3Fb4xUkyy1B9HkPgj"\n' +
        "      },\n" +
        '      "client_secret": "pi_3M2UYVI3Fb4xUkyy1B9HkPgj_secret_wg5AnEbNmtLtnhMrVWt5zt2Os",\n' +
        '      "confirmation_method": "automatic",\n' +
        '      "created": 1668062887,\n' +
        '      "currency": "aed",\n' +
        '      "customer": null,\n' +
        '      "description": null,\n' +
        '      "invoice": null,\n' +
        '      "last_payment_error": null,\n' +
        '      "livemode": false,\n' +
        '      "metadata": {\n' +
        '        "prescriptionId": "18",\n' +
        '        "orderId": "10",\n' +
        '        "patientId": "16"\n' +
        "      },\n" +
        '      "next_action": null,\n' +
        '      "on_behalf_of": null,\n' +
        '      "payment_method": null,\n' +
        '      "payment_method_options": {\n' +
        '        "card": {\n' +
        '          "installments": null,\n' +
        '          "mandate_options": null,\n' +
        '          "network": null,\n' +
        '          "request_three_d_secure": "automatic"\n' +
        "        }\n" +
        "      },\n" +
        '      "payment_method_types": [\n' +
        '        "card"\n' +
        "      ],\n" +
        '      "processing": null,\n' +
        '      "receipt_email": null,\n' +
        '      "review": null,\n' +
        '      "setup_future_usage": null,\n' +
        '      "shipping": null,\n' +
        '      "source": null,\n' +
        '      "statement_descriptor": null,\n' +
        '      "statement_descriptor_suffix": null,\n' +
        '      "status": "requires_payment_method",\n' +
        '      "transfer_data": null,\n' +
        '      "transfer_group": null\n' +
        "    }\n" +
        "  },\n" +
        '  "livemode": false,\n' +
        '  "pending_webhooks": 2,\n' +
        '  "request": {\n' +
        '    "id": "req_jYy3yfwUrNlpDz",\n' +
        '    "idempotency_key": "662680e3-27fa-4e90-9cff-1f9f1dd6fe18"\n' +
        "  },\n" +
        '  "type": "payment_intent.created"\n' +
        "}",
      },
      headers: {
        host: "localhost:1337",
        "user-agent": "Stripe/1.0 (+https://stripe.com/docs/webhooks)",
        "content-length": "2136",
        accept: "*/*; q=0.5, application/xml",
        "cache-control": "no-cache",
        "content-type": "application/json; charset=utf-8",
        "stripe-signature":
            "t=1668062887,v1=d22b622a3d8a03cf3ece1ad0392fa29d68f32a894ebaee2f00b81f1568eef142,v0=2521a222b95d210da1b43815102d43387eb065a46e8c07b5d6ba9ea826a7df78",
        "accept-encoding": "gzip",
      },
    },
    id: "evt_3M28zwI3Fb4xUkyy1TBvfj4h",
    object: "event",
    api_version: "2020-08-27",
    created: 1667980020,
    data: {
      object: {
        id: "pi_3M28zwI3Fb4xUkyy13wXiIpF",
        object: "payment_intent",
        amount: 10000,
        client_secret:
            "pi_3M28zwI3Fb4xUkyy13wXiIpF_secret_snJr5y19VfRAXNqJuBMXbzTtc",
        confirmation_method: "automatic",
        metadata: [Object],
        payment_method_options: [Object],
        payment_method_types: [Array],
        status: "requires_payment_method",
      },
    },
    livemode: false,
    pending_webhooks: 2,
    type: "payment_intent.payment_failed",
  },

  mockPaymentIntentFailedEvent: {
    id: "evt_3M2bVgI3Fb4xUkyy0EqRMaTj",
    object: "event",
    api_version: "2020-08-27",
    created: 1668089635,
    data: {
      object: {
        id: "ch_3M2bVgI3Fb4xUkyy0cdAeXSY",
        object: "charge",
        amount: 10000,
        amount_captured: 10000,
        amount_refunded: 0,
        application: null,
        application_fee: null,
        application_fee_amount: null,
        balance_transaction: "txn_3M2bVgI3Fb4xUkyy0UbPOqBT",
        billing_details: [Object],
        calculated_statement_descriptor: "Stripe",
        captured: true,
        created: 1668089635,
        currency: "aed",
        customer: null,
        description: null,
        destination: null,
        dispute: null,
        disputed: false,
        failure_balance_transaction: null,
        failure_code: null,
        failure_message: null,
        fraud_details: {},
        invoice: null,
        livemode: false,
        metadata: [Object],
        on_behalf_of: null,
        order: null,
        outcome: [Object],
        paid: true,
        payment_intent: "pi_3M2bVgI3Fb4xUkyy0f19ybXI",
        payment_method: "pm_1M2bVuI3Fb4xUkyyD0Vz9QWy",
        payment_method_details: [Object],
        receipt_email: null,
        receipt_number: null,
        receipt_url:
            "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTEU2allJM0ZiNHhVa3l5KKSOtJsGMga1LQDblFM6LBYeRiolTduJpKa2ns-Nj6Vy9yh0dkoWhx_PYmiq3TCYRzEr9D7XyCaHJtUF",
        refunded: false,
        refunds: [Object],
        review: null,
        shipping: null,
        source: null,
        source_transfer: null,
        statement_descriptor: null,
        statement_descriptor_suffix: null,
        status: "requires_payment_method",
        transfer_data: null,
        transfer_group: null,
      },
    },
    livemode: false,
    pending_webhooks: 2,
    request: {
      id: "req_CLDKCkPd5Pm7Il",
      idempotency_key: "1606bcc1-777e-42b3-9156-320c4664ca84",
    },
    type: "payment_intent.payment_failed",
  },
  providerPaymentFailedDetails: {
    status: "Payment Method Required",
    maskedCardNumber: null,
    providerMetadata: {
      id: "evt_3M2bVgI3Fb4xUkyy0EqRMaTj",
      object: "event",
      api_version: "2020-08-27",
      created: 1668089635,
      data: {
        object: {
          id: "ch_3M2bVgI3Fb4xUkyy0cdAeXSY",
          object: "charge",
          amount: 10000,
          amount_captured: 10000,
          amount_refunded: 0,
          application: null,
          application_fee: null,
          application_fee_amount: null,
          balance_transaction: "txn_3M2bVgI3Fb4xUkyy0UbPOqBT",
          billing_details: [Object],
          calculated_statement_descriptor: "Stripe",
          captured: true,
          created: 1668089635,
          currency: "aed",
          customer: null,
          description: null,
          destination: null,
          dispute: null,
          disputed: false,
          failure_balance_transaction: null,
          failure_code: null,
          failure_message: null,
          fraud_details: {},
          invoice: null,
          livemode: false,
          metadata: [Object],
          on_behalf_of: null,
          order: null,
          outcome: [Object],
          paid: true,
          payment_intent: "pi_3M2bVgI3Fb4xUkyy0f19ybXI",
          payment_method: "pm_1M2bVuI3Fb4xUkyyD0Vz9QWy",
          payment_method_details: [Object],
          receipt_email: null,
          receipt_number: null,
          receipt_url:
              "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTEU2allJM0ZiNHhVa3l5KKSOtJsGMga1LQDblFM6LBYeRiolTduJpKa2ns-Nj6Vy9yh0dkoWhx_PYmiq3TCYRzEr9D7XyCaHJtUF",
          refunded: false,
          refunds: [Object],
          review: null,
          shipping: null,
          source: null,
          source_transfer: null,
          statement_descriptor: null,
          statement_descriptor_suffix: null,
          status: "requires_payment_method",
          transfer_data: null,
          transfer_group: null,
        },
      },
      livemode: false,
      pending_webhooks: 2,
      request: {
        id: "req_CLDKCkPd5Pm7Il",
        idempotency_key: "1606bcc1-777e-42b3-9156-320c4664ca84",
      },
      type: "payment_intent.payment_failed",
    },
    paymentSubType: null,
    paymentType: null,
  },
};
