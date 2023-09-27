package com.mo.whatisthis.apis.socket.handlers.impl;

import com.mo.whatisthis.apis.history.entities.DeviceHistoryEntity.Category;
import com.mo.whatisthis.apis.history.services.DamagedHistoryService;
import com.mo.whatisthis.apis.history.services.DeviceHistoryService;
import com.mo.whatisthis.apis.history.services.HistoryService;
import com.mo.whatisthis.apis.socket.handlers.common.AbstractMessageHandlerInterface;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.DataType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SendType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SessionKey;
import com.mo.whatisthis.apis.socket.services.SocketProvider;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import com.mo.whatisthis.redis.services.RedisService;
import java.util.Map;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

@Component
public class CoordinateMessageHandlerImpl extends AbstractMessageHandlerInterface {

    public CoordinateMessageHandlerImpl(
        SocketProvider socketProvider, JwtTokenProvider jwtTokenProvider,
        RedisService redisService,
        HistoryService historyService,
        DamagedHistoryService damagedHistoryService,
        DeviceHistoryService deviceHistoryService) {
        super(socketProvider, jwtTokenProvider, redisService, historyService, damagedHistoryService,
            deviceHistoryService);
    }

    @Override
    public void handle(WebSocketSession session, Map<String, String> dataMap) {

        // Device가 Employee에게 보내는 Message

        String senderDevice = getAttributeAtSession(session, SessionKey.SERIAL_NUMBER);
        String receiverEmployeeNo = getAttributeAtSession(session, SessionKey.EMPLOYEE_NO);
        String historyId = getAttributeAtSession(session, SessionKey.HISTORY_ID);

        Float x = Float.valueOf(getDataAtMap(dataMap, DataType.x));
        Float y = Float.valueOf(getDataAtMap(dataMap, DataType.y));

        dataMap.put(DataType.historyId.name(), historyId);
        String sendMessage = convertMessageToString(SendType.COORDINATE, dataMap);

        sendMessageToEmployee( senderDevice, receiverEmployeeNo, sendMessage);

    }
}

